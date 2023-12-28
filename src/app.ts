import express from 'express';
import {courseRouter} from './routes/courses';
import { testRouter } from './routes/tests';

export const app = express();
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware);

app.get('/', async (req, res) => {
    res.send('hello12')
})

app.use("/courses", courseRouter);
app.use("/__text__", testRouter);
