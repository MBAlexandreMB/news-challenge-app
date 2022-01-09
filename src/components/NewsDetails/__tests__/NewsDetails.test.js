import { shallow } from 'enzyme';
import NewsDetails from '../NewsDetails';

const defaultProps = {
    news: {
        title: 'fakeTitle',
        description: 'fakeDescription',
        url: 'fakeUrl',
        content: 'fakeContent',
    },
    onClose: jest.fn(),
};

describe('<NewsListing />', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<NewsDetails {...defaultProps} />);

        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly with a news with no values', () => {
        const wrapper = shallow(<NewsDetails {...defaultProps} news={{}} />);

        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('should remove anything after "…" on content', () => {
        const updatedNews = {
            ...defaultProps.news,
            content: 'a content with… [and other characteres]'
        };
        const wrapper = shallow(<NewsDetails {...defaultProps} news={updatedNews} />);
        const content = wrapper.find('[data-test="content"]').text();

        expect(content).toBe('a content with…');
    });
});