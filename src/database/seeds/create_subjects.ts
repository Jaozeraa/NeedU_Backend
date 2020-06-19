import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('subjects').insert([
        { title: 'Matemática', image: 'matematica.svg'},
        { title: 'Literatura', image: 'literatura.svg'},
        { title: 'Geografia', image: 'geografia.svg'},
        { title: 'Fisíca', image: 'fisica.svg'},
        { title: 'Programação', image: 'programacao.svg'},
        { title: 'Química', image: 'quimica.svg'},
    ])
}