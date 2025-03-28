
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        type:String,
        default:""
    },
    photo:{
       
        type:String,
         default:""
    },
    Bio:{

        type:String,
         default:""
    }
    
})


const users = mongoose.model('users', userSchema)

module.exports = users