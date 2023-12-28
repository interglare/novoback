import { CourseType, DBType } from "../db/db";
import { CourseViewModel } from "../models/CourseViewModel";
import { CreateCourseModel } from "../models/CreateCourseModel";
import { QueryCoursesModel } from "../models/QueryCoursesModel";
import { URIParamsCourseIdModel } from "../models/URIParamsCourseIdModel";
import { UpdateCourseModel } from "../models/UpdateCourseModel";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../types";
import express, { Response } from 'express';
import {HTTP_STATUSES} from "../utils";
import {coursesService} from "./../domain/course-service";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";

export const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => ({
    id: dbCourse.id,
    title: dbCourse.title
})

const titleValidation = 
    body('title')
        .trim()
        .isLength({min: 3, max: 30})
        .withMessage('Title length should be from 3 to 10 symbols');



export const courseRouter = express.Router();

courseRouter.get('/', async (req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
    const foundCourses = await coursesService.findCourses(req.query.title?.toString())
    res.json(foundCourses.map(getCourseViewModel));
})

courseRouter.get('/:id', async (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {

    const foundedCourse = await coursesService.findCourseById(+req.params.id);

    if (!foundedCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.json(foundedCourse);
})


courseRouter.post('/', 
    titleValidation,
    inputValidationMiddleware,
    async (req: RequestWithBody<CreateCourseModel>, res: Response) => {
    debugger;
    const createdCourse = await coursesService.createCourse(req.body.title)

    res.status(HTTP_STATUSES.CREATED_201).json(getCourseViewModel(createdCourse));
})

courseRouter.delete('/:id', async (req: RequestWithParams<{ id: string }>, res) => {

    const isDeleted = await coursesService.deleteCourse(+req.params.id)
    if (isDeleted) {
        res.sendStatus(HTTP_STATUSES.NOT_CONTENT_204);
    } else {
        res.sendStatus(404)
    }
})
    
courseRouter.put('/:id', 
    titleValidation,
    inputValidationMiddleware,
    async (req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdateCourseModel>, res) => {

    const isUpdated = await coursesService.updateCourse(+req.params.id, req.body.title)
    if (isUpdated) {
        const foundCourse = await coursesService.findCourseById(+req.params.id);
        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.status(HTTP_STATUSES.OK_200).json(foundCourse)
    } else {
        res.sendStatus(404);
    }
})

