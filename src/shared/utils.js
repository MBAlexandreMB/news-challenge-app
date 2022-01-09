import { NO_IMAGE_URL } from './contants';

export const onImageLoadingError = ({ currentTarget }) => {
    currentTarget.onerror = null;
    if (currentTarget.src !== NO_IMAGE_URL) {
        currentTarget.src= NO_IMAGE_URL;
    }
};


export class Scheduler {
    constructor(callback = () => {}) {
        this.callback = callback;
        this.timeout = null;
        this.timestamp = null;
    }

    isLastScheduled(timestamp) {
        return this.timestamp === timestamp;
    }

    start(timer, callback = null) {
        this.cancelCurrentSchedule();

        if (callback) {
            this.callback = callback;
        }

        this.timestamp = Date.now();
        this.timeout = setTimeout(() => {
            this.callback();
            this.cancelCurrentSchedule();
        }, timer);
    }

    done() {
        this.timestamp = null;
    }

    cancelCurrentSchedule() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}