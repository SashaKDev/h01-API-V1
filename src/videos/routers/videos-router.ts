import express, {Request, Response} from "express";
import {db} from "../../db/in-memory.db";
import {Videos} from "../types/types";
import {videosInputDtoValidation} from "../validation/videosInputDtoValidation";
import {videosUpdateDtoValidation} from "../validation/videosUpdateDtoValidation";


export const videosRouter = express.Router({});

videosRouter.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .json(db.videos);
});
videosRouter.get('/:id', (req: Request, res: Response) => {
    const foundVideo = db.videos.find(v => v.id === +req.params.id);
    if (!foundVideo) {
        res.sendStatus(404);
        return;
    }
    res
        .status(200)
        .json(foundVideo);

})
videosRouter.post('/', (req: Request, res: Response) => {
    const errors = [];
    errors.push(videosInputDtoValidation(req.body)[0]);
    if(errors.length > 0) {
        res
            .status(400)
            .json({errorsMessages: errors});
        return;
    }

    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const createdVideo: Videos = {
        id: db.videos.length ? db.videos.length + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: today.toISOString(),
        publicationDate: tomorrow.toISOString(),
        availableResolutions: req.body.availableResolutions,
    }

    db.videos.push(createdVideo);

    res
        .status(201)
        .json(createdVideo);
});
videosRouter.put('/:id', (req: Request, res: Response) => {

    const errors = [];
    errors.push(videosUpdateDtoValidation(req.body)[0]);
    if(errors.length > 0) {
        res
            .status(400)
            .json(errors[0]);
        return;
    }

    const foundVideo = db.videos.find(v => v.id === +req.params.id);
    if(!foundVideo) {
        res.sendStatus(404);
        return;
    } else {
        foundVideo.title = req.body.title;
        foundVideo.author = req.body.author;
        foundVideo.availableResolutions = req.body.availableResolutions;
        foundVideo.canBeDownloaded = req.body.canBeDownloaded;
        foundVideo.minAgeRestriction = req.body.minAgeRestriction;
        foundVideo.publicationDate = req.body.publicationDate;
    }

    res.sendStatus(204);
});
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const foundVideo = db.videos.find(v => v.id === +req.params.id);
    if(!foundVideo) {
        res.sendStatus(404);
        return;
    }
    db.videos = db.videos.filter(v => v.id !== +req.params.id);
    res.sendStatus(204);

})
