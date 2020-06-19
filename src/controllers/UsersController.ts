import { Request, Response } from 'express'
import knex from '../database/connection'

class UsersController {
    async index(request: Request, response: Response) {
        const { email, password } = request.query

        const users = await knex('users')
            .where('password', String(password))
            .where('email', String(email))
            .distinct()
            .select('users.*')

            const serializedUsers = users.map(user => {
                return {
                    ...user,
                    image_url: `${process.env.APP_URL}/uploads/${user.image}`,
                }
            })

            return response.json(serializedUsers)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const user = await knex('users').where('id', id).first()

        if(!user) {
            return response.status(400).json('User not founded')
        }

        const serializedUser = {
            ...user,
            image_url: `${process.env.APP_URL}/uploads/${user.image}`
    }

        return response.json({ user: serializedUser })
    }

    async create(request: Request, response: Response) {
        const {
            name,
            age,
            sex,
            email,
            password,
            city,
            uf,
        } = request.body

        const user = {
            image: request.file.filename,
            name,
            age,
            sex,
            email,
            password,
            city,
            uf,
            rate: 5
        }
    
        const insertedIds = await knex('users').insert(user)

        const user_id = insertedIds[0]

        return response.json({id: user_id, ...user})
    }
}

export default UsersController