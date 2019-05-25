//@vendors
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

//@actions
import * as actions from '../../actions/githubActions';

//@constants
import actionTypes from '../../constants/actionTypes';

//@config
import config from '../../config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('github actions', () => {
    const GENERIC_ERROR = 'generic_error';
    const USER = {
        name: 'john',
        language: 'es',
    };
    const REPO = {
        name: 'react app',
        description: 'description',
    };

    afterEach(() => {
        nock.cleanAll();
    });

    it('creates success action when calling fetchUserRequest', () => {
        nock(config.baseUrl)
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get(`/users/${config.user}`)
            .reply(200, {
                user: USER,
            });

        const expectedActions = [
            {
                type: actionTypes.FETCH_USER,
            },
            {
                type: actionTypes.FETCH_USER_SUCCESS,
                data: {
                    user: USER,
                },
            },
        ];

        const store = mockStore();
        return store.dispatch(actions.fetchUserRequest()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates failure action when calling fetchUserRequest', () => {
        nock(config.baseUrl)
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get(`/users/${config.user}`)
            .replyWithError({
                error: GENERIC_ERROR,
            });

        const expectedActions = [
            {
                type: actionTypes.FETCH_USER,
            },
            {
                type: actionTypes.FETCH_USER_FAILURE,
                error: 'Could not fetch User :(',
            },
        ];

        const store = mockStore();
        return store.dispatch(actions.fetchUserRequest()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates success action when calling fetchReposRequest', () => {
        nock(config.baseUrl)
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get(`/users/${config.user}/repos`)
            .reply(200, {
                repo: REPO,
            });

        const expectedActions = [
            {
                type: actionTypes.FETCH_REPOS,
            },
            {
                type: actionTypes.FETCH_REPOS_SUCCESS,
                data: {
                    repo: REPO,
                },
            },
        ];

        const store = mockStore();
        return store.dispatch(actions.fetchReposRequest()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates failure action when calling fetchReposRequest', () => {
        nock(config.baseUrl)
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get(`/users/${config.user}/repos`)
            .replyWithError({
                error: GENERIC_ERROR,
            });

        const expectedActions = [
            {
                type: actionTypes.FETCH_REPOS,
            },
            {
                type: actionTypes.FETCH_REPOS_FAILURE,
                error: 'Could not fetch Repos :(',
            },
        ];

        const store = mockStore();
        return store.dispatch(actions.fetchReposRequest()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates action when calling selectRepo', () => {
        const repo = '77765437';
        const expectedAction = {
            type: actionTypes.SELECT_REPO,
            data: repo,
        };
        expect(actions.selectRepo(repo)).toEqual(expectedAction);
    });

    it('creates action when calling resetSelectedRepo', () => {
        const expectedAction = {
            type: actionTypes.RESET_SELECTED_REPO,
        };
        expect(actions.resetSelectedRepo()).toEqual(expectedAction);
    });

    it('creates action when calling dismissError', () => {
        const expectedAction = {
            type: actionTypes.DISMISS_ERROR,
        };
        expect(actions.dismissError()).toEqual(expectedAction);
    });
});
