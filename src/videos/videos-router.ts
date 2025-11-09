import express, {Request, Response} from "express";
import {db} from "../db/in-memory.db";
import {VideosInputDto} from "./dto/videos-input.dto";
import {AvailableResolutions, Videos} from "./types/types";
import {videosInputDtoValidation} from "./validation/videosInputDtoValidation";


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
    const errors = videosInputDtoValidation(req.body);
    if(errors.length > 0) {
        res
            .status(400)
            .json(errors[0]);
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

