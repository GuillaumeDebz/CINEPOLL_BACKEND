// Imports //
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



// REGISTER //
async function register(data) {

    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(data.password, salt)


    await User.create(data)
}



// LOGIN //
async function login(email, password) {

    const currentUser = await User.findOne({ email })
    console.log(currentUser);

    if (currentUser) {

        try {

            const isPasswordOk = await bcrypt.compare(password, currentUser.password)

            if (isPasswordOk) {
                const token = jwt.sign({ id: currentUser._id }, process.env.ACCESSTOKENSECRET, { expiresIn: process.env.JWTExpiry })

                return {
                    token
                }

            }
        }

        catch (err) {
            console.log(err);
        }

    }

    return null
}







module.exports = {
    register,
    login
}
