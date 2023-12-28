import { db } from "../db/db";
import express from 'express';
import {HTTP_STATUSES} from "../utils";


export const testRouter = express.Router();

testRouter.delete('/data', (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NOT_CONTENT_204);
})
