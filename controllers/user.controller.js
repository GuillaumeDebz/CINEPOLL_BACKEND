// Imports //
const userService = require("../services/user.service")


// Controller //
const userController = {
    
    // REGISTER //
    register: async(req, res) => {

        try {
            await userService.register(req.body)
            res.sendStatus(201)
        } 
        catch (err) {
            console.log(err.message)
            res.status(500).json({ error: err.message })
        }

    },


    // LOGIN //
    login: async(req, res) => {
        const { email, password } = req.body
        const token = await userService.login(email, password)

        if(!token) res.status(500).json({ err: "Email et/ou mot de passe incorrect"})
        else res.status(200).json(token)
    }


}


module.exports = userController
