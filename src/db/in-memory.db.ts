import {AvailableResolutions, Videos} from "../videos/types/types";


export const db = {
    videos: <Videos[]>[
        {
            id: 1,
            title: 'Lord of The Rings',
            author: 'Peter Jackson',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: '2025-11-09T14:27:35.123Z',
            publicationDate: '2000-11-09T19:00:00.123Z',
            availableResolutions: [AvailableResolutions.P720, AvailableResolutions.P1080],
        },
        {
            id: 2,
            title: 'Dark Knight',
            author: 'Christopher Nolan',
            canBeDownloaded: false,
            minAgeRestriction: 16,
            createdAt: '2022-10-09T14:27:35.123Z',
            publicationDate: '2010-11-09T19:00:00.123Z',
            availableResolutions: [AvailableResolutions.P720, AvailableResolutions.P1080, AvailableResolutions.P1440],
        },
        {
            id: 3,
            title: 'Some title',
            author: 'Some author',
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: '2021-11-09T14:27:35.123Z',
            publicationDate: '2021-11-10T19:00:00.123Z',
            availableResolutions: [AvailableResolutions.P360, AvailableResolutions.P720],
        },]
}