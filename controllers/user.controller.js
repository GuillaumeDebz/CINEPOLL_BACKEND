const userService = require("../services/user.service")

const userController = {
    register: async(req, res) => {

        try {
            await userService.register(req.body)
            res.sendStatus(201)
        } 
        catch (err) {
            console.log(err.message)
            res.status(500).json({ error: err.message })
        }

    }
}


module.exports = userController
