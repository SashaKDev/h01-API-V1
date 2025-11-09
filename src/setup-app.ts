import express, {Express} from "express";
import {videosRouter} from "./videos/routers/videos-router";
import {testingRouter} from "./testing/testing-router";


export const setupApp = (app: Express) => {

    app.use(express.json());

    app.use('/api/videos', videosRouter);
    app.use('/api/testing', testingRouter);

    app.get('/', (req, res) => {
        res
            .status(200)
            .json({ message: 'Hello Incubator!' });
    })

}