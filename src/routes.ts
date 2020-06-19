import express from 'express'
import multer from 'multer'
import knex from './database/connection'
import multerConfig from './config/multer'

import TeachersController from './controllers/TeachersController'
import SubjectsController from './controllers/SubjectsController'
import UsersController from './controllers/UsersController'

const routes = express.Router()
const upload = multer(multerConfig)
const usersController = new UsersController()
const teachersController = new TeachersController()
const subjectsController = new SubjectsController()

routes.get('/subjects', subjectsController.index)

routes.post('/teachers', upload.single('image'), teachersController.create)

routes.get('/teachers/:id', teachersController.show)

routes.get('/teachers', teachersController.index)

routes.get('/teacher-auth', async (request, response) => {
    const { email, password} = request.query

    const teachers = await knex('teachers')
        .join('teacher_subjects', 'teachers.id', '=', 'teacher_subjects.teacher_id')
        .where('email', String(email))
        .where('password', String(password))
        .distinct()
        .select('teachers.*')

        const serializedTeachers = teachers.map(teacher => {
            return {
                ...teacher,
                image_url: `${process.env.APP_URL}/uploads/${teacher.image}`,
            }
        })

        return response.json(serializedTeachers)
})

routes.post('/users', upload.single('image'), usersController.create)

routes.get('/users/:id', usersController.show)

routes.get('/users', usersController.index)

export default routes