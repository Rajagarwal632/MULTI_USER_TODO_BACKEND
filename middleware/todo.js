const JWT_USER = process.env.JWT_USER
const jwt = require("jsonwebtoken")
function todoauth(req,res,next){
    const token = req.headers.token
    const decoded_data = jwt.verify(token,JWT_USER)
    if(decoded_data){
        req.userid = decoded_data.userid
        next()  
    }
    else{
        res.json({
            msg : "NOT AUTHORIZED"
        })
    }
}
module.exports = {
    todoauth
}