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
            res.status(500).send("Email et/ou pseudo invalide")
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
    },


    // ADD FRIEND //
    addFriend: async (req, res) => {

        const { id } = req.user;
        const { pseudo } = req.body

        try {
           await userService.addFriend(id, pseudo)
            res.sendStatus(204)

        } catch (error) {
            res.status(500).json( error.message )
        }
    },


    // FRIENDS LIST  //
    getFriendList: async (req, res) => {

        const { id } = req.user;

            try {
                const friends = await userService.getFriendsList(id)
                res.status(200).json(friends)

            } catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
    }


}


module.exports = userController
