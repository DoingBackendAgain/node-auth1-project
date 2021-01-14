const db = require("../data/dbconfig")

module.exports = {
    add,
    get,
    findBy,
    findById
}

function get(){
    return db("users")
}

function findBy(filter){
    return db("users")
        .select("id", "username", "password")
        .where(filter)
}

function findById(id){
    return db("users")
        .where({id})
        .select("id", "username", "password")
}

async function add(user){
    const [id] = await db("users")
        .insert(user)
        return findById
}

