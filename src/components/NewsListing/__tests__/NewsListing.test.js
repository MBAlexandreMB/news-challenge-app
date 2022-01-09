import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import NewsListing from '../NewsListing';

const newsList = [
    { url: 'fakeurl', title: 'faketitle' },
    { url: 'fakeurl2', title: 'faketitle2' },
];

const mockScheduleASearch = { start: jest.fn() };
const mockLoadMoreNews = jest.fn();

jest.mock('../../../hooks', () => ({
    useGetNews: () => ([newsList, mockLoadMoreNews, mockScheduleASearch]),
}));

jest.mock('react-intersection-observer', () => ({
    ...jest.requireActual('react-intersection-observer')
}));

const defaultProps = {
    isAnyNewsSelected: false,
    isLoading: false,
    onSelectNews: jest.fn(),
    setIsLoading: jest.fn(),
    onNewsLoaded: jest.fn(),
};

describe('<NewsListing />', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<NewsListing {...defaultProps} />);

        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when loading', () => {
        const wrapper = shallow(<NewsListing {...defaultProps} isLoading={true} />);
        const loader = wrapper.find('Loader');
        
        expect(loader.exists()).toBe(true);
        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });


    it('should set news list class as selected when any news is selected', () => {
        const wrapper = shallow(<NewsListing {...defaultProps} isAnyNewsSelected={true} />);

        const isNewsListClassSelected = wrapper.find('[data-test="news-list"]').hasClass('selected');
        expect(isNewsListClassSelected).toBe(true);
    });

    it('should NOT set news list class as selected when no news is selected', () => {
        const wrapper = shallow(<NewsListing {...defaultProps} isAnyNewsSelected={false} />);

        const isNewsListClassSelected = wrapper.find('[data-test="news-list"]').hasClass('selected');
        expect(isNewsListClassSelected).toBe(false);
    });

    it('should schedule a search when search input changes', () => {
        const wrapper = shallow(<NewsListing {...defaultProps} />);

        jest.clearAllMocks();
        jest.useFakeTimers();
        act(() => {
            wrapper.find('[data-test="search-input"]').simulate('change', { target: { value: 'search value' } });
            jest.runAllTimers();
        })

        expect(mockScheduleASearch.start).toHaveBeenCalled();
    });
});