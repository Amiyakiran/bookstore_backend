const multer = require('multer')

//The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    
        
        callback(null, './pdfuploads')
    },
    filename: (req, file, callback) => {
        //Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
        const filename = `pdf-${Date.now()}-${file.originalname}`
        callback(null , filename)
    }
})

//fileFilter 

const fileFilter  = (req, file , callback)=>{
   
    
   if(file.mimetype=='application/pdf'){
    callback(null , true)
   }
   else{
    callback(null, false)
    return callback(new Error('Only pdf files are allowed'))
   }
}
//multer configuration
const pdfmulterConfig = multer({
    storage,
    fileFilter
})

//export 
module.exports = pdfmulterConfig