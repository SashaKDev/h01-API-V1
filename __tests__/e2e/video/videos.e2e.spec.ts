import express from "express";
import request from "supertest";
import {setupApp} from "../../../src/setup-app";
import {VideosInputDto} from "../../../src/videos/dto/videos-input.dto";
import {AvailableResolutions} from "../../../src/videos/types/types";

describe ('Videos API', () => {
    const app = express();
    setupApp(app);

    const testVideoData: VideosInputDto = {
        title: 'new title',
        author: 'new author',
        availableResolutions: [AvailableResolutions.P720],
    };

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(204);
    });

    it('should return 201; POST /videos', async () => {

        await request(app)
            .post('/videos')
            .send(testVideoData)
            .expect(201);

        const getResponse = await request(app)
            .get('/videos')
            .expect(200);

        expect(getResponse.body).toHaveLength(1);
    })

    it('should return 400; POST /videos', async () => {

        await request(app)
            .post('/videos')
            .send({
                ...testVideoData,
                author: 5,
            })
            .expect(400);

        const getResponse = await request(app)
            .get('/videos')
            .expect(200);

        expect(getResponse.body).toHaveLength(1);
    })

})