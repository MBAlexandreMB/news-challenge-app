import { Scheduler } from '../utils';

describe('Scheduler', () => {
    it('should set default values if no input is given upon creation', () => {
        const scheduler = new Scheduler();

        expect(scheduler.callback).toEqual(expect.any(Function));
        expect(scheduler.timeout).toBe(null);
        expect(scheduler.timestamp).toBe(null);
    });

    describe('start', () => {
        let cancelScheduleSpy;
        beforeEach(() => {
            cancelScheduleSpy = jest
                .spyOn(Scheduler.prototype, 'cancelCurrentSchedule')
                .mockImplementation(jest.fn());
        });

        afterAll(() => {
            jest.restoreAllMocks();
        });

        it('should set instance callback if any is given', () => {
            const oldCallback = jest.fn();
            const newCallback = jest.fn();
            const scheduler = new Scheduler(oldCallback);
            jest.clearAllMocks();
            jest.useFakeTimers();
            scheduler.start(0, newCallback);
            jest.runAllTimers();

            expect(oldCallback).not.toHaveBeenCalled();
            expect(newCallback).toHaveBeenCalled();
        });

        it('should set a new timestamp', () => {
            const scheduler = new Scheduler();
            jest.useFakeTimers();
            scheduler.start(0, jest.fn());
            jest.runAllTimers();

            expect(scheduler.timestamp).not.toBeNull();
        });

        it('should call the callback after the time ends (and not before)', () => {
            const scheduler = new Scheduler();
            jest.useFakeTimers();
            const timer = 2000;
            const callback = jest.fn();
            scheduler.start(timer, callback);
            expect(callback).not.toHaveBeenCalled();
            jest.runAllTimers();

            expect(callback).toHaveBeenCalled();
        });

        it('should cancel any prior schedule, if their time didnt elapse yet', () => {
            const scheduler = new Scheduler();
            const timer = 2000;

            scheduler.start(timer, jest.fn());
            const oldTimeout = scheduler.timeout;

            scheduler.start(timer, jest.fn());
            expect(cancelScheduleSpy).toHaveBeenCalled();
            expect(scheduler.timeout).not.toEqual(oldTimeout);
        });

        it('should cancel the current schedule, if its time elapsed', () => {
            const scheduler = new Scheduler();
            jest.useFakeTimers();
            const timer = 0;

            scheduler.start(timer, jest.fn());
            jest.runAllTimers();

            expect(cancelScheduleSpy).toHaveBeenCalled();
        });
    });

    describe('cancelCurrentSchedule', () => {
        it('should set timeout null', () => {
            const scheduler = new Scheduler();
            scheduler.timeout = 1;
            scheduler.cancelCurrentSchedule();

            expect(scheduler.timeout).toBeNull();
        });

        it('should not allow the current schedule to run its callback', () => {
            const scheduler = new Scheduler();
            const callback = jest.fn();
            const timer = 2000;
            jest.useFakeTimers();

            scheduler.start(timer, callback);
            scheduler.cancelCurrentSchedule();
            jest.runAllTimers();

            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('done', () => {
        it('should set timestamp null', () => {
            const scheduler = new Scheduler();
            scheduler.timestamp = 1;
            scheduler.done();

            expect(scheduler.timestamp).toBeNull();
        });
    });

    describe('isLastScheduled', () => {
        it('should return true if provided timestamp is the current one', () => {
            const scheduler = new Scheduler();
            scheduler.timestamp = 1;

            expect(scheduler.isLastScheduled(1)).toBeTruthy();
        });

        it('should return false if provided timestamp is NOT the current one', () => {
            const scheduler = new Scheduler();
            scheduler.timestamp = 1;

            expect(scheduler.isLastScheduled(2)).toBeFalsy();
        });
    });
});
