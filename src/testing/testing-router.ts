import express, {Request, Response} from "express";
import {db} from "../db/in-memory.db";


export const testingRouter = express.Router({});

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    db.videos = [];
    res.sendStatus(204);
})
