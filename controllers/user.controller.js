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

        // FIXME Fix degeulasse ou on prend un id hardcodé
        // Veuillez remplacer ceci par l'utilisation de votre token (envoyer via interceptor dans angular)
        // NB : Ceci ne doit plus etre present lors de la présentation :D
        const id = '63d90cdbe13d2566df0cfc14'
        // ↑ Remove this shit     (╯°□°）╯︵ ┻━┻

        console.log("hello");
        const { pseudo } = req.body
        console.log(req.body);
        try {
           await userService.addFriend(id, pseudo)
            res.sendStatus(204)

        } catch (error) {
            res.status(500).json( error.message )
        }
    },

    // ADD FRIEND //
    getFriendList: async (req, res) => {

            try {
                const friends = await userService.getFriendsList()
                res.status(200).json(friends)

            } catch (error) {
                res.status(500).json( err.message )
            }
    }



}


module.exports = userController
