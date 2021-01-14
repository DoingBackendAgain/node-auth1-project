const express = require("express")
const session = require("express-session")
const knexSessionStore = require("connect-session-knex")(session)
const cors = require("cors")


const router =  require("./router/router")
const dbconfig = require("./data/dbconfig")

const server = express()

server.use(express.json());
server.use(session({
    resave:false,
    saveUninitialized:false,
    secret: "keep it secret!",
    store: new knexSessionStore({
        knex: dbconfig,
        creatable: true
    }),
}))
server.use(cors())
server.use('/api', router )


module.exports = server;