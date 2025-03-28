const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  }, 
  language:{
    type:String,
    required:true
  }, 
  noOfPage:{
    type:Number,
    required:true
  },
   isbn:{
    type:String,
    required:true
  }, 
  imageurl:{
    type:String,
    required:true
  }, 
  price:{
    type:Number,
    required:true
  }, 
  discountPrice:{
    type:Number,
    required:true
  },
  category:{
    type:String,
    required:true
  } ,
  abstract:{
    type:String,
    required:true
  },
  uploadImages:{
    type:Array,
    required:true
  },
  userMail:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:'active'
  },
  brought:{
    type:String,
    default:""
  }
})



const books = mongoose.model('books', bookSchema)

module.exports = books