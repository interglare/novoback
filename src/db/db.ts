import { MongoClient } from "mongodb"

const mongoUrl = process.env.mongoURI || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1"

const client = new MongoClient(mongoUrl)

const _db = client.db("shop")
export const courseCollection = _db.collection<CourseType>("courses");

export async function runDb() {
    try {
        await client.connect()
        await client.db("courses").command({ping: 1})
        console.log('Connected successfully to mongo server');
        
    } catch {
        console.log('Can\'t connect to db');
        
        await client.close()
    }
}

export type CourseType = {
    id: number
    title: string
    studentsCount: number
}

export const db: DBType = {
    courses: [
        { id: 1, title: 'forntend', studentsCount: 10 },
        { id: 2, title: 'backend', studentsCount: 10 },
        { id: 3, title: 'automation qa', studentsCount: 10 },
        { id: 4, title: 'devops', studentsCount: 10 },
    ]
}

export type DBType = { courses: CourseType[] }