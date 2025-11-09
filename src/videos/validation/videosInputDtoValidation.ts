import {VideosInputDto} from "../dto/videos-input.dto";
import {ValidationError} from "../types/validationError";


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
        data.availableResolutions.length === 0
    ) {
        errors.push({
            message: 'Invalid available resolutions',
            field: 'available resolutions',
        })
    }

    return errors;
}