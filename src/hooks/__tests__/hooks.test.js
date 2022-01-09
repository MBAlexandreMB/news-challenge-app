import React from 'react';
import { mount, shallow } from 'enzyme';
import { Scheduler } from '../../shared/utils';
import { useGetNews } from '../hooks';

const setNewsLoaded = jest.fn();
const FakeComponent = (searchValue = '') => {
    const [news, loadMoreNews, scheduler, newsError] = useGetNews(jest.fn(), setNewsLoaded, searchValue);

    return (
        <>
            <button data-test="news" value={news}>news</button>
            <button data-test="loadMoreNews" value={loadMoreNews}>loadMoreNews</button>
            <button data-test="scheduler" value={scheduler}>scheduler</button>
            <button data-test="newsError" value={newsError}>newsError</button>
        </>
    );
}

const originalUseContext = React.useContext;
describe('useGetNews', () => {
    const setUseStateReturns = args => {
        React.useState = jest.fn();
        React.useState.mockImplementation(() => {
            const callCount = React.useState.mock.calls.length;
            return args[(callCount - 1) % args.length];
        });
    };

    afterEach(() => {
        jest.clearAllMocks();
        React.useContext = originalUseContext;
    });

    it('should return default values when called for the first time', () => {
        const wrapper = shallow(<FakeComponent />);
        const news = wrapper.find('[data-test="news"]').prop('value');
        const loadMoreNews = wrapper.find('[data-test="loadMoreNews"]').prop('value');
        const scheduler = wrapper.find('[data-test="scheduler"]').prop('value');
        const newsError = wrapper.find('[data-test="newsError"]').prop('value');

        expect(news).toEqual([]);
        expect(loadMoreNews).toEqual(expect.any(Function));
        expect(scheduler instanceof Scheduler).toBe(true);
        expect(newsError).toBeNull();
    });

    it('should call setTriggerMoreNews when loadMoreNews is called', () => {
        const mockSetTriggerMoreNews = jest.fn();

        setUseStateReturns([
            [[], jest.fn()], // [news, setNews]
            [null, jest.fn()], // [newsError, setNewsError]
            [{}, mockSetTriggerMoreNews], // [triggerLoadMoreNews, setTriggerMoreNews]
            [new Scheduler()] // [scheduler]
        ]);
        
        const wrapper = shallow(<FakeComponent />);
        const loadMoreNews = wrapper.find('[data-test="loadMoreNews"]').prop('value');

        loadMoreNews();

        expect(mockSetTriggerMoreNews).toHaveBeenCalled();
    });

    it('should clear the news list if the search value changes', () => {
        const mockSetNews = jest.fn();

        setUseStateReturns([
            [[], mockSetNews], // [news, setNews]
            [null, jest.fn()], // [newsError, setNewsError]
            [{}, jest.fn()], // [triggerLoadMoreNews, setTriggerMoreNews]
            [new Scheduler()] // [scheduler]
        ]);
        
        const wrapper = mount(<FakeComponent />);
        wrapper.setProps({
            searchValue: 'another search value',
        })

        expect(mockSetNews).toHaveBeenCalled();
        expect(setNewsLoaded).toHaveBeenCalled();
    });
});