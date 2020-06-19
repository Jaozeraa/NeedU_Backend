import { Request, Response } from 'express'
import knex from '../database/connection'

class TeachersController {
    async index(request: Request, response: Response) {
        const { city, uf, subjects } = request.query

        const parsedSubjects = String(subjects)
        .split(',')
        .map(subject => Number(subject.trim()))

        const teachers = await knex('teachers')
            .join('teacher_subjects', 'teachers.id', '=', 'teacher_subjects.teacher_id')
            .whereIn('teacher_subjects.subject_id', parsedSubjects)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('teachers.*')

            const serializedTeachers = teachers.map(teacher => {
                return {
                    ...teacher,
                    image_url: `${process.env.APP_URL}/uploads/${teacher.image}`,
                }
            })

            return response.json(serializedTeachers)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const teacher = await knex('teachers').where('id', id).first()

        if(!teacher) {
            return response.status(400).json('Teacher not founded')
        }

        const serializedTeacher = {
                ...teacher,
                image_url: `${process.env.APP_URL}/uploads/${teacher.image}`
        }

        const subjects = await knex('subjects')
            .join('teacher_subjects', 'subjects.id', '=', 'teacher_subjects.subject_id')
            .where('teacher_subjects.teacher_id', id)
            .select('subjects.title')

        return response.json({ teacher: serializedTeacher , subjects })
    }

    async create(request: Request, response: Response) {
        const {
            name,
            age,
            sex,
            email,
            password,
            latitude,
            longitude,
            city,
            uf,
            description,
            subjects
        } = request.body
    
        const trx = await knex.transaction()

        const teacher = {
            image: request.file.filename,
            name,
            age,
            sex,
            email,
            password,
            latitude,
            longitude,
            city,
            uf,
            description,
            rate: 5
        }
    
        const insertedIds = await trx('teachers').insert(teacher)
    
        const teacher_id = insertedIds[0]
    
        const teacherSubjects = subjects
        .split(',')
        .map((subject: string) => Number(subject.trim()))
        .map((subject_id: number) => {
            return {
                subject_id,
                teacher_id,
            }
        })
    
        await trx('teacher_subjects').insert(teacherSubjects)

        await trx.commit()

        return response.json({
            id: teacher_id,
            ...teacher,

        })
    }
}



export default TeachersController