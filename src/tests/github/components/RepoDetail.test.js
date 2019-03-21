//@vendor
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';

//@components
import RepoDetail from '../../../github/components/RepoDetail';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = () => {
    let repo = fromJS({
        id: 77777,
        name: 'repo name',
        full_name: 'reactjs app',
        language: 'ES',
    });

    const unselectRepo = jest.fn();

    return <RepoDetail repo={repo} unselectRepo={unselectRepo} />;
};

describe('RepoDetail test', () => {
    it('renders correctly', () => {
        const wrapper = shallow(buildComponent());
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
