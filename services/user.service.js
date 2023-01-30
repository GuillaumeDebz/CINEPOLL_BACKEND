// Imports //
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



// REGISTER NEW USER //
async function register(email, pseudo, password) {

    const existingEmail = await User.findOne({ email })
    
    // SI EMAIL PAS EXISTANT //
    if (!existingEmail) {

        // CREATION USER //
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)

        const data = {email, pseudo, password};

        await User.create(data)


        // TOKEN //
        const currentUser = await User.findOne({ email })
        const token = jwt.sign({ id: currentUser._id }, process.env.ACCESSTOKENSECRET, { expiresIn: process.env.JWTEXPIRE })

        return {
            token
        }
    }

    else throw new Error('Email déjà existant')

}


// UPDATE USER //
async function update(data) {

    const currentUser = await User.findOne({ email })

    if (currentUser) {

        const salt = await bcrypt.genSalt(10)
        data.password = await bcrypt.hash(data.password, salt)
    
    
        await User.create(data)
        }    

    else throw new Error('Email incorrect')
    

}


// LOGIN EXISTING USER //
async function login(email, password) {

    const currentUser = await User.findOne({ email })
    console.log(currentUser);

    if (currentUser) {

        const isPasswordOk = await bcrypt.compare(password, currentUser.password)

        if (isPasswordOk) {
            const token = jwt.sign({ id: currentUser._id }, process.env.ACCESSTOKENSECRET, { expiresIn: process.env.JWTEXPIRE })

            return {
                token
            }
        }
        throw new Error('Mot de passe incorrect')



    }

    else throw new Error('Email incorrect')
}







module.exports = {
    register,
    update,
    login
}
