import { shallow } from 'enzyme';
import { NO_NEWS_SELECTED_TEXT } from '../../../shared/contants';
import NoNewsSelected from '../NoNewsSelected';

describe('<NoNewsSelected />', () => {
    it('should render correctly without props', () => {
        const wrapper = shallow(<NoNewsSelected />);

        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when loading', () => {
        const wrapper = shallow(<NoNewsSelected isLoading={true} />);
        const loader = wrapper.find('Loader');

        expect(loader.exists()).toBeTruthy();
        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly when NOT loading', () => {
        const wrapper = shallow(<NoNewsSelected isLoading={false} />);
        const loader = wrapper.find('Loader');
        const figure = wrapper.find('figure');
        const text = wrapper.find('h1').text();

        expect(loader.exists()).toBeFalsy();
        expect(figure.exists()).toBeTruthy();
        expect(text).toBe(NO_NEWS_SELECTED_TEXT);
        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });
});