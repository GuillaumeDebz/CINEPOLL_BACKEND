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
        try {
            const token = await userService.login(email, password)
    
            res.status(200).json(token)
            
        } catch (error) {
            res.status(400).send("Email ou mot de passe incorrect")
        }
    }


}


module.exports = userController
