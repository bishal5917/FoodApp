const JWT = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers.token
    if (tokenHeader) {
        JWT.verify(tokenHeader.split(" ")[1], "faang", (err, user) => {
            if (err) {
                res.status(403).json("Token not valid")
            }
            req.user = user
            next();
        })
    }
    else {
        return res.status(401).json("Not authenticated")
    }
}

const auth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next()
        }
        else {
            res.status(403).json("You are not allowed")
        }
    })
}

module.exports={auth,verifyToken}