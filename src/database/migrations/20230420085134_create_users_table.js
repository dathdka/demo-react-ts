

exports.up = function (knex) {
    return knex.schema.createTable('users', (table) =>{
        table.string("id").primary()
        table.string("name")
        table.string("phone")
        table.string("email")
        table.string("password")
        table.string("address")
        table.boolean("admin")
    })
}

exports.down = function (knex) {
    return knex.schema.droptable("users")
}

