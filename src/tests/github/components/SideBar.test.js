//@vendor
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';

//@components
import SideBar from '../../../github/components/Sidebar';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = props => {
    const user = fromJS({
        following: 7,
        followers: 777,
        public_repos: 70,
        public_gists: 10,
    });

    return <SideBar user={user} />;
};

describe('SideBar test', () => {
    it('renders correctly', () => {
        const wrapper = shallow(buildComponent());
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
