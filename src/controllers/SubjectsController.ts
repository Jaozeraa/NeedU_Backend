import { Request, Response } from 'express'
import knex from '../database/connection'

class SubjectsController {
    async index(request: Request, response: Response) {
        const subjects = await knex('subjects').select('*')
        const serializedSubjects = subjects.map(subject => {
            return {
                id: subject.id,
                title: subject.title,
                image_url: `${process.env.APP_URL}/uploads/${subject.image}`
            }
        })
        return response.json(serializedSubjects)
    }
}

export default SubjectsController