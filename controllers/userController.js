const users = require("../model/userModel");
const jwt = require('jsonwebtoken')

exports.registerController = async (req, res) => {
    console.log('inside register controller');
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(406).json('You Already have a account. Please login')
        }
        else {
            const newUser = new users({
                username, email, password
            })
            await newUser.save()
            res.status(200).json('Successfully registered')
        }

    } catch (error) {
        res.status(401).json(error)
    }

}


exports.loginController = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    try {


        const existingUser = await users.findOne({ email })
        console.log(existingUser);

        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, 'secretekey')
                res.status(200).json({ existingUser, token })

            }
            else {
                res.status(403).json('Incorrect email ID or password')
            }

        } else {
            res.status(406).json('Your Account doesnot found . Please register')
        }


    } catch (error) {
        res.status(401).json(error)
    }

}

exports.googleLoginController = async (req, res) => {
    const { username, email, password, photo } = req.body
    console.log(username, email, password, photo);

    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            const token = jwt.sign({ userMail: existingUser.email }, 'secretekey')
            res.status(200).json({ existingUser, token })
        }
        else {
            const newUser = new users({
                username, email, password, photo
            })
            await newUser.save()
            const token = jwt.sign({ userMail: newUser.email }, 'secretekey')
            res.status(200).json({ existingUser: newUser, token })
        }

    } catch (error) {
        res.status(401).json(error)
    }

}

exports.editUserDetailsController = async (req, res) => {
    const { username, password, bio, photo } = req.body
    console.log(username, password, bio);
    const updatephoto = req.file ? req.file.filename : photo
    console.log(photo);

    const userMail = req.payload
    console.log(userMail);
    try {
        const userDetails = await users.findOneAndUpdate({ email: userMail }, {

            username,
            email: userMail,
            password,
            photo: updatephoto,
            Bio: bio

        }, { new: true })

        await userDetails.save()
        res.status(200).json(userDetails)


    } catch (error) {
        res.status(401).json(error)
    }



}

exports.editAdminDetailsController = async (req, res) => {
    const { username, password, photo } = req.body
    console.log(username, password);
    const updatephoto = req.file ? req.file.filename : photo
    console.log(updatephoto);

    const userMail = req.payload
    console.log(userMail);
    try {
        const adminDetails = await users.findOneAndUpdate({ email: userMail }, {
            username,
            email: userMail,
            password,
            photo: updatephoto,
        }, { new: true })

        await adminDetails.save()
        res.status(200).json(adminDetails)


    } catch (error) {
        res.status(401).json(error)
    }



}

exports.getAllUsersController = async (req, res) => {
    try {
        const allUsers = await users.find()
        res.status(200).json(allUsers)

    } catch (error) {
        res.status(401).json(error)
    }
}