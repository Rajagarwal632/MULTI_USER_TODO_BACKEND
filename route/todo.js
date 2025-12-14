const {Router} = require("express")
const todoroute = Router()

const mongoose = require("mongoose")
const {z} = require("zod")
const { todomodel } = require("../config/db")
const { todoauth } = require("../middleware/todo")

mongoose.connect(process.env.MONGO_URL)

todoroute.post("/create", todoauth,async function(req,res){
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

todoroute.get("/me",todoauth,async function(req,res){
    const userid = req.userid
    const todos = await todomodel.find({
        userid
    })
    res.json({
        msg : "ALL TODOS ARE :-",
        todos 
    })
})

module.exports = {
    todoroute
}