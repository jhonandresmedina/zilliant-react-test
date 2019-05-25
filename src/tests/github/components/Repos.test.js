//@vendor
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { fromJS } from 'immutable';

//@components
import { Repos } from '../../../github/components/Repos';

Enzyme.configure({
    adapter: new Adapter(),
});

const fetchReposRequest = jest.fn();

const buildComponent = ({ github }) => {
    let immGithub = fromJS({
        lastSuccessfulReposFetch: null,
    });

    if (github) {
        immGithub = github;
    }

    return <Repos fetchReposRequest={fetchReposRequest} immGithub={immGithub} />;
};

describe('Repos test', () => {
    it('should call component did mount with no previous call', () => {
        shallow(buildComponent({}));
        expect(fetchReposRequest).toHaveBeenCalledTimes(1);
    });

    it('should call component did mount with previous fetch', () => {
        let github = fromJS({
            lastSuccessfulReposFetch: new Date(1991, 12, 1),
        });
        shallow(buildComponent({ github }));
        expect(fetchReposRequest).toHaveBeenCalledTimes(2);
    });
});
