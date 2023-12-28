import {CourseType, db} from "../db/db";

export const coursesRepository = {
    async findCourses(title: string | null | undefined): Promise<CourseType[]>{
        if (title){

            let filteredCourses = db.courses;
            filteredCourses = filteredCourses.filter(c => c.title.indexOf(title) > -1);
            return filteredCourses;
        } else {
            return db.courses;
        }
    },
    async findCourseById(id: number): Promise<CourseType|null>{
        return db.courses.find(c => c.id === +id) ?? null;
    },
    async createCourse(title: string): Promise<CourseType>{
        const createdCourse: CourseType = {
            id: +(new Date()),
            title,
            studentsCount: 10
        }
        db.courses.push(createdCourse);

        return createdCourse
    },
    async updateCourse(id: number, title: string): Promise<boolean>{

        const foundedCourse = db.courses.find(c => c.id === +id);

        if (!foundedCourse) {
            return false;
        }
        foundedCourse.title = title;
        return true;
    },
    async deleteCourse(id: number): Promise<boolean>{
        db.courses = db.courses.filter(c => c.id !== +id);
        return !!this.findCourseById(id);
    },
}
