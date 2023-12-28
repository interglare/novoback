import {CourseType, courseCollection } from "../db/db";


export const coursesRepository = {
    
    async findCourses(title: string | null | undefined): Promise<CourseType[]>{

        const filter: any = {}
        if (title){
            filter.title = {$regex: title}
        } 
        return courseCollection.find(filter).toArray() 
    },
    async findCourseById(id: number): Promise<CourseType|null>{
        return await courseCollection.findOne({id: id})
    },
    async createCourse(createdCourse: CourseType): Promise<CourseType>{
        await courseCollection.insertOne(createdCourse)

        return createdCourse
    },
    async updateCourse(id: number, title: string): Promise<boolean>{
        const result = await courseCollection.updateOne({id: id}, { $set: {title: title}})
        return result.matchedCount === 1;
    },
    async deleteCourse(id: number): Promise<boolean>{
        const result = await courseCollection.deleteOne({id: id})
        return result.deletedCount === 1;
    },
}
