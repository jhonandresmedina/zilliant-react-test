//@vendor
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

//@components
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('App test', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<App />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
