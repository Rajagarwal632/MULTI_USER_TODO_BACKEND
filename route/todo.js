const {Router} = require("express")
const todoroute = Router()

const mongoose = require("mongoose")
const {z} = require("zod")
const { todomodel } = require("../config/db")
const { todoauth } = require("../middleware/todo")

mongoose.connect(process.env.MONGO_URL)

todoroute.post("/todo", todoauth,async function(req,res){
    const reqbody = z.object({
        title : z.string(),
        description : z.string()
    })
    const parsedatawithsucess = reqbody.safeParse(req.body)
    if(!parsedatawithsucess.success){
        res.json({
            msg : "INCORRECT FORMAT",
            error : parsedatawithsucess.error
        })
        console.log(req.body);
        return
    }
    const title = req.body.title
    const description = req.body.description
    const userid = req.userid

    await todomodel.create({
        title,
        description,
        userid
    })
    res.json({
        msg : "TODO CREATED"
    })
    
    
})

todoroute.get("/todo",todoauth,async function(req,res){
    const userid = req.userid
    const todos = await todomodel.find({
        userid
    })
    res.json({
        msg : "ALL TODOS ARE :-",
        todos 
    })
})

todoroute.put("/todo/:id",todoauth,async function(req,res){
    const todoid = req.params.id
    const userid = req.userid

    const reqbody = z.object({
        title : z.string().optional(),
        description : z.string().optional(),
        done : z.boolean().optional()
    })
    const parsedatawithsucess = reqbody.safeParse(req.body)
    if(!parsedatawithsucess.success){
        res.json({
            msg : "INCORRECT FORMAT",
            error : parsedatawithsucess.error
        })
        return
    }
    const title = req.body.title
    const description=req.body.description
    const done = req.body.done
    const mytodo = await todomodel.findOneAndUpdate({
        _id : todoid,
        userid : userid 
    }, {
        title,
        description,
        done
    })
    if (mytodo){
        res.json({
            msg : "TODO UPDATED"
        })
    }else{
        res.json({
            msg : "EITHER TODO NOT EXISTS OR INCORRECT CREDENTIALS"
        })
    }

})

module.exports = {
    todoroute
}