//@vendor
import { fromJS } from 'immutable';

//@selectors
import { getRepoById } from '../../selectors/githubRepo';

describe('githubRepo test', () => {
    const immGithub = fromJS({
        repos: [
            {
                id: 77777,
                name: 'repo name',
                contributions: 10,
                forks: 7,
            },
            {
                id: 77677,
                name: 'react app',
                contributions: 2,
                forks: 1,
            },
        ],
    });

    let state;

    beforeEach(() => {
        state = {
            immGithub,
        };
    });

    it('get repos correctly when not selected repo', () => {
        const response = getRepoById(state);
        expect(response).toEqual(immGithub.get('repos'));
    });

    it('get repos correctly when selected repo', () => {
        state.immGithub = immGithub.merge({ selectedRepo: 77677 });
        const response = getRepoById(state);
        expect(response).toEqual(immGithub.get('repos').get(1));
    });
});
