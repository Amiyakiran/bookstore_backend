const express = require('express')
const bookController = require('./controllers/bookController')
const userController = require('./controllers/userController')
const jobController = require('./controllers/jobController')
const applicationController = require('./controllers/applicationController')
//import jwtmiddleware
const jwtmiddleware = require('./middleware/jwtMiddleware')
//import multer
const multerConfig = require('./middleware/multerMiddleware')

const pdfmulterConfig = require('./middleware/pdfMulterMiddleware')

const routes = new express.Router()

//get home books 
routes.get('/home-books', bookController.getHomeBookController)

//get userBooks
routes.get('/user-allbooks', jwtmiddleware ,bookController.getAllUserBookController)


//register
routes.post('/user-register', userController.registerController)

//login 
routes.post('/user-login', userController.loginController)


//googleLogin
routes.post('/google-login', userController.googleLoginController)

//upload books 
routes.post('/upload-books',jwtmiddleware,multerConfig.array("uploadImages",3), bookController.uploadBookController )

//get a Book 
routes.get('/book/:id', bookController.getABookController)

//edit user profile
routes.put('/edit-user', jwtmiddleware, multerConfig.single("photo"), userController.editUserDetailsController)

//selled book
routes.get('/user-sell-book',jwtmiddleware, bookController.sellBookController)

//brought book
routes.get('/user-brought-book',jwtmiddleware, bookController.broughtBookController)

//edit user profile
routes.put('/edit-admin', jwtmiddleware, multerConfig.single("photo"), userController.editAdminDetailsController)

//add job
routes.post('/add-job', jobController.addJobController)

//get Job
routes.get('/get-allJobs', jobController.getJobController)

//delete Job 
routes.delete('/delete-job/:id', jobController.deleteJobController)


//get all users 
routes.get('/all-users', userController.getAllUsersController)



//get all books 
routes.get('/all-books', bookController.getAllBookController)

//approve book
routes.put('/approve-Book', bookController.approveBookController)

//delete sold book history 
routes.delete('/delete-soldBook/:id', bookController.deleteSoldBookController)

//job application request
routes.post('/job-application', jwtmiddleware, pdfmulterConfig.single('resume'), applicationController.jobApplicationController  )


//get all application
routes.get('/get-allapplications', applicationController.getAllApplicationController)


//make the payment 
routes.post('/make-payment', jwtmiddleware,bookController.makePaymentController)
module.exports = routes