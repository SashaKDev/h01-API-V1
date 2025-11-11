import {VideosInputDto} from "../dto/videos-input.dto";
import {ValidationError} from "../types/validationError";
import {AvailableResolutions} from "../types/types";


export const videosInputDtoValidation = (
    data: VideosInputDto
): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        typeof data.title !== 'string' ||
        data.title.length > 40
    ) {
        errors.push({
            message: 'Invalid title',
            field: 'title',
        })
    }

    if (
        typeof data.author !== 'string' ||
        data.author.length > 20
    ) {
        errors.push({
            message: 'Invalid author',
            field: 'author',
        })
    }
    if (
        !Array.isArray(data.availableResolutions) ||
        data.availableResolutions.length === 0
    ) {
        errors.push({
            message: 'Invalid available resolutions',
            field: 'availableResolutions',
        })
    } else {
        const existingResolutions = Object.values(AvailableResolutions);
        for (let i = 0; i < data.availableResolutions.length; i++) {
             if (!existingResolutions.includes(data.availableResolutions[i])) {
                 errors.push({
                     message: 'Invalid available resolutions',
                     field: 'availableResolutions',
                 })
             }
        }
    }

    return errors;
}