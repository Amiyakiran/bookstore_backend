const express = require('express')
const cors = require('cors')

// to load environment variables
require('dotenv').config()
//mongodb connection file import
require('./databaseConnection')


//import routes
const routes = require('./routes')
//server creation
const bookstoreServer = express() 
//server connecting with frontend
bookstoreServer.use(cors())
bookstoreServer.use(express.json())
bookstoreServer.use(routes)
//exporting upload folder
bookstoreServer.use('/upload', express.static('./uploads'))
//export pdf file
bookstoreServer.use('/pdf-upload', express.static('./pdfuploads'))

//port for server
PORT = 4000 || process.env.PORT

//run the server 
bookstoreServer.listen(PORT ,()=>{
    console.log(`server running successfully at port number ${PORT}`);
    
})
