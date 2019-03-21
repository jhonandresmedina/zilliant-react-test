//@vendor
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';
import { Card } from 'react-md';

//@components
import RepoCard from '../../../github/components/RepoCard';

Enzyme.configure({
    adapter: new Adapter(),
});

const buildComponent = props => {
    let repo = fromJS({
        id: 77777,
        name: 'repo name',
        full_name: 'reactjs app',
        language: 'ES',
    });

    return <RepoCard repo={repo} {...props} />;
};

describe('RepoCard test', () => {
    it('renders correctly', () => {
        const wrapper = shallow(buildComponent());
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('click event', () => {
        const selectRepo = jest.fn();
        const wrapper = shallow(
            buildComponent({
                selectRepo,
            }),
        );
        const card = wrapper.find(Card);
        card.simulate('click');
        expect(selectRepo.mock.calls.length).toEqual(1);
    });
});
