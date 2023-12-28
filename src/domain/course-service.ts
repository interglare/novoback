import {CourseType, courseCollection } from "../db/db";
import { coursesRepository } from "../repositories/courses-db-repository";


export const coursesService = {
    
    async findCourses(title: string | null | undefined): Promise<CourseType[]>{
        return coursesRepository.findCourses(title)
    },
    async findCourseById(id: number): Promise<CourseType|null>{
        return coursesRepository.findCourseById(id)
    },
    async createCourse(title: string): Promise<CourseType>{
        const createdCourse: CourseType = {
            id: +(new Date()),
            title,
            studentsCount: 10
        }
        return await coursesRepository.createCourse(createdCourse)
    },
    async updateCourse(id: number, title: string): Promise<boolean>{
        return await coursesRepository.updateCourse(id, title)
    },
    async deleteCourse(id: number): Promise<boolean>{
        return await coursesRepository.deleteCourse(id)
    },
}
