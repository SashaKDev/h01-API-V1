import {AvailableResolutions} from "../types/types";

export type VideosInputDto = {
    title: string,
    author: string,
    availableResolutions: AvailableResolutions[],
}