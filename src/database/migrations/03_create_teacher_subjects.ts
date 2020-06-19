import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('teacher_subjects', table =>{
        table.increments('id').primary()
        table.integer('teacher_id')
            .notNullable()
            .references('id')
            .inTable('teachers')
        table.integer('subject_id')
            .notNullable()
            .references('id')
            .inTable('subjects')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('teacher_subjects')
}