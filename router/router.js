const express = require("express")
const bcrypt = require("bcryptjs")
const model = require("./model")
const {restrict} = require("./middleware")

const router = express.Router()

router.get("/users", restrict(), (req, res, next) => {
    try{
        model.get()
            .then((user)=> {
                res.json(user)
            })
    }
    catch(err){
        next(err)
    }
})


router.post("/register", async (req, res, next)=> {
    try{
        const {username, password} = req.body
        const user = await model.findBy({ username })

        if(user){
            return res.status(409).json({
                message: "username already exisits"
            })
        }

        const newUser = await model.add({
            username,
            password: await bcrypt.hash(password, 10)
        })

        res.status(201).json(newUser)

    }
    catch(err){
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try{

        const {username, password} =req.body
        const user = await model.findBy({ username }).first()

        if(!user){
            return res.status(401).json({
                message: "That user doesn't exist"
            })
        }

        const passwordValid = await bcrypt.compare(password, user.password)
            if(!passwordValid){
                return res.status(401).json({
                    message: "This password isn't valid"
                })
            }

            req.session.user = user

            res.json({
                message: `Welcome ${user.username}!`
            })




    }
    catch(err){
        next(err)
    }
})

module.exports = router