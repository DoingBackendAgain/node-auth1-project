const bcrypt = require("bcryptjs")
const model = require("./model")

function restrict(){
    return async (req, res, next) => {
        try {
            if(!req.session || !req.session.user){
                return res.status(401).json({
                    message: "Invalid credentials"
                })
            }
            next()
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = {
    restrict
}

// must put "username" = previously entered username
// and "password" = previously entered password
// in header when making call in insomnia on any route
// where this restrict function is being used wihtout sessions.
// in this file const {username, password} = req.headers
// in video he called middleware.restrict() in router 
//instead of just restrict()

//with session, we use req.session.user = user in router to handle
// data needing to access information

// if (!req.session || req.session.user){
//    return res.status(401).json(authError)
//}