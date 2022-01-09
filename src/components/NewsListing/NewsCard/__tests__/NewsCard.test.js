import { shallow } from 'enzyme';
import { UNKNOWN_PUBLISHED_DATE, UNKNOWN_SOURCE } from '../../../../shared/contants';
import NewsCard from "../NewsCard";

const defaultProps = {
    onSelectNews: jest.fn(),
    news: [
        {
            title: 'testTitle - randomSource',
            publishedAt: new Date(2022, 0, 7, 2, 0).toISOString(),
            urlToImage: 'randomURL' }
        ],
};

describe('<NewsCard />', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<NewsCard {...defaultProps} />);

        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('should remove the source from the title', () => {
        const updatedNews = {
            ...defaultProps.news,
            title: 'test with source - source',
        };

        const wrapper = shallow(<NewsCard {...defaultProps} news={updatedNews} />);

        const title = wrapper.find('h1.news-title').text();
        const source = wrapper.find('[data-test="source"]').text();

        expect(title).toBe('test with source');
        expect(source).toBe('source');
    });

    it('should work with a title without a source', () => {
        const updatedNews = {
            ...defaultProps.news,
            title: 'test without source',
        };

        const wrapper = shallow(<NewsCard {...defaultProps} news={updatedNews} />);

        const title = wrapper.find('h1.news-title').text();
        const source = wrapper.find('[data-test="source"]').text();

        expect(title).toBe('test without source');
        expect(source).toBe(UNKNOWN_SOURCE);
    });

    it('should set the published date', () => {
        const updatedNews = {
            ...defaultProps.news,
            publishedAt: new Date(2022, 0, 9, 2, 0).toISOString(),
        };

        const wrapper = shallow(<NewsCard {...defaultProps} news={updatedNews} />);

        const publishedAt = wrapper.find('[data-test="publishedAt"]').text();

        expect(publishedAt).toBe('09/01/2022, 02:00');
    });

    it('should work without a published date', () => {
        const updatedNews = {
            ...defaultProps.news,
            publishedAt: undefined,
        };

        const wrapper = shallow(<NewsCard {...defaultProps} news={updatedNews} />);

        const publishedAt = wrapper.find('[data-test="publishedAt"]').text();

        expect(publishedAt).toBe(UNKNOWN_PUBLISHED_DATE);
    });
    
    it('call onSelectNews when clicked', () => {
        const wrapper = shallow(<NewsCard {...defaultProps} />);

        wrapper.find('[data-test="card-container"]').simulate('click');

        expect(defaultProps.onSelectNews).toHaveBeenCalled();
    });
});