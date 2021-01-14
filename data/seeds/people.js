
exports.seed = async function(knex) {
  await knex("users").insert([
    {username:"Shannon", password: "hey123"},
    {username:"Timothy", password: "Hello"},
    {username:"Charlie", password: "WTF"},
    {username:"Jacob", password: "WhoKnows"},
    {username:"Karen", password: "Angel777"}
  ])
};
