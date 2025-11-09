import {AvailableResolutions} from "../types/types";

export type VideosUpdateDto = {
    title: string,
    author: string,
    availableResolutions: AvailableResolutions[],
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    publicationDate: string;
}