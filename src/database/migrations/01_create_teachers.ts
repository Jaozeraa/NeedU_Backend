import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('teachers', table =>{
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('name').notNullable()
        table.string('age', 2).notNullable()
        table.string('password').notNullable()
        table.string('sex', 1).notNullable()
        table.string('email').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
        table.string('description').notNullable()
        table.float('rate').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('teachers')
}
