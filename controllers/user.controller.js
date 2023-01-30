// Imports //
const userService = require("../services/user.service")


// Controller //
const userController = {

    // REGISTER //
    register: async (req, res) => {

        const { email, pseudo, password } = req.body
        
        try {
            const token = await userService.register(email, pseudo, password)
            res.status(200).json(token)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json( err.message )
        }

    },


    // UPDATE  //
    update: async (req, res) => {

        try {
            await userService.update(req.body)
            res.sendStatus(201)
        }
        catch (err) {
            console.log(err.message)
        }

    },

    // LOGIN //
    login: async (req, res) => {

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
