import { NO_IMAGE_URL } from './contants';

export const onImageLoadingError = ({ currentTarget }) => {
    currentTarget.onerror = null;
    if (currentTarget.src !== NO_IMAGE_URL) {
        currentTarget.src= NO_IMAGE_URL;
    }
};