const {Route} = require("express")
const userroute = Route()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltround = 10
const mongoose = require("mongoose")
const {z} = require("zod")
const { usermodel } = require("../config/db")


userroute.post("/signup" , async function(req,res){
    const reqbody = z.object({
        email : z.string().email(),
        password : z.string(),
        name : z.string()
    })
    const parsedatawithsucess = reqbody.safeParse()
    if(!parsedatawithsucess.success){
        res.json({
            msg : "INCORRECT FORMAT",
            error : parsedatawithsucess.error
        })
        return
    }
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    const hash_password = bcrypt.hash(password,saltround)
    await usermodel.create({
        email,
        password : hash_password,
        name
    })
    res.json({
        msg : "SIGNUP SUCESS"
    })
})

userroute.post("/signin" , async function(req,res){
    
})
userroute.get("/todo" , async function(req,res){

})