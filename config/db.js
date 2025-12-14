const mongoose = require("mongoose")
const Schema = mongoose.Schema
const objectid = Schema.ObjectId

const user = new Schema({
    email : {type : String , unique : true},
    password : String,
    name : String
})
const todo = new Schema({
    title : String,
    description : String,
    done : {type:Boolean, default : false},
    userid : {type : objectid , ref : "user" }
})

const usermodel = mongoose.model("user" , user)
const todomodel = mongoose.model("todo" , todo)
module.exports = {
    usermodel,
    todomodel
}