import { NextFunction, Request, Response } from "express";
import { HTTP_STATUSES } from "../utils";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({errors: errors.array()});
    } else {
        next()
    }
}