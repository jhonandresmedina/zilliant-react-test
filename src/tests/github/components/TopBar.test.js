//@vendor
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';

//@components
import TopBar from '../../../github/components/TopBar';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = props => {
    const user = fromJS({
        avatar_url: 'https://example-url/image.png',
        login: 'login',
    });

    return <TopBar user={user} />;
};

describe('TopBar test', () => {
    it('renders correctly', () => {
        const wrapper = shallow(buildComponent());
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
