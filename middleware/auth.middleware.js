const jwt = require("jsonwebtoken")


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESSTOKENSECRET, (err, user) => {
            console.log(token);
            if (err) {
                console.log('error ici', err);
                return res.sendStatus(403) 
            }

            console.log(user);
            
            req.user = user
            next()
        })

    }

    else {
        res.sendStatus(401)
    }
}


module.exports = authMiddleware