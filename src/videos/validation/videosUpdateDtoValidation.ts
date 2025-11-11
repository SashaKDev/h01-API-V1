import {ValidationError} from "../types/validationError";
import {VideosUpdateDto} from "../dto/videos-update.dto";

const ISODATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

export const videosUpdateDtoValidation = (
    data: VideosUpdateDto
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

    if (
        typeof data.canBeDownloaded !== 'boolean'
    ) {
        errors.push({
            message: 'Invalid canBeDownloaded status',
            field: 'canBeDownloaded',
        })
    }

    if (data.minAgeRestriction !== null) {
        if (typeof data.minAgeRestriction === 'number'){
            if (
                data.minAgeRestriction > 18 ||
                data.minAgeRestriction < 1
            ){
                errors.push({
                    message: 'Invalid age restriction',
                    field: 'minAgeRestriction',
                })
            }
        } else if (typeof data.minAgeRestriction !== 'number') {
            errors.push({
                message: 'Invalid age restriction',
                field: 'minAgeRestriction',
            })
        }
    }

    if (
        typeof data.publicationDate !== 'string' ||
        !ISODATE_REGEX.test(data.publicationDate)
    ) {
        errors.push({
            message: 'Invalid publication Date',
            field: 'publicationDate',
        })
    }

    return errors;
}