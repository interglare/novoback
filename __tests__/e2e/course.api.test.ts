import request from 'supertest';
import { CreateCourseModel } from '../../src/models/CreateCourseModel';
import { UpdateCourseModel } from '../../src/models/UpdateCourseModel';
import { app } from '../../src/app';
import {HTTP_STATUSES} from "../../src/utils";

describe('/course', () => {
    beforeAll(async () => {
        await request(app).delete('/__text__/data')
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })
    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/courses/9999999')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`shouldn't create course with incorrect input data`, async () => {
        const data: CreateCourseModel = { title: '' }

        await request(app)
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    let createdCourse1: any = null;


    it(`shoul create course with correct input data`, async () => {

        const data: CreateCourseModel = { title: 'it-incubator' }
        const createResponse = await request(app)
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201,)

        createdCourse1 = createResponse.body;

        expect(createdCourse1).toEqual({
            id: expect.any(Number),
            title: 'it-incubator'
        })

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [createdCourse1])
    })

    let createdCourse2: any = null;
    it(`create one more course`, async () => {
        const data: CreateCourseModel = { title: 'it-incubator 2' }

        const createdResponse = await request(app)
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)
        createdCourse2 = createdResponse.body;
        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: data.title
        })
        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [createdCourse1, createdCourse2])
    })

    it(`shouldn't update course with incorrect input data`, async () => {
        const data: UpdateCourseModel = { title: '' }

        await request(app)
            .put('/courses/' + createdCourse1.id)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    })

    it(`shouldn't update course that not exist`, async () => {
        const data: UpdateCourseModel = { title: 'good title' }

        await request(app)
            .put('/courses/' + -2)
            .send(data)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it(`should update course with correct input data`, async () => {
        const data: UpdateCourseModel = { title: 'good new title' }

        await request(app)
            .put('/courses/' + createdCourse1.id)
            .send(data)
            .expect(HTTP_STATUSES.OK_200)

        await request(app)
            .get('/courses/' + createdCourse1.id)
            .expect(HTTP_STATUSES.OK_200, { ...createdCourse1, title: data.title })
    })

    it(`should delete course with correct input data`, async () => {

        await request(app)
            .delete('/courses/' + createdCourse1.id)
            .expect(HTTP_STATUSES.NOT_CONTENT_204)

        await request(app)
            .get('/courses/' + createdCourse1.id)
            .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
            .delete('/courses/' + createdCourse2.id)
            .expect(HTTP_STATUSES.NOT_CONTENT_204)

        await request(app)
            .get('/courses/' + createdCourse2.id)
            .expect(HTTP_STATUSES.NOT_FOUND_404)

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })
})

