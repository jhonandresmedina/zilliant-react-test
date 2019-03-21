//@vendors
import expect from 'expect';

//@reducers
import reducer, { setInitialState } from '../../reducers/githubReducer';

//@utilities
import { getCurrentDate } from '../../utilities/dateUtilities';

//@constants
import actionTypes from '../../constants/actionTypes';

describe('github reducer', () => {
    const ERROR = 'error';
    let initialState;

    beforeEach(() => {
        initialState = setInitialState;
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FETCH_USER', () => {
        expect(reducer(undefined, { type: actionTypes.FETCH_USER })).toEqual(
            initialState.merge({ isFetchingUser: true }),
        );
    });

    it('should handle FETCH_USER_SUCCESS', () => {
        const data = 'user data';
        const response = reducer(undefined, {
            type: actionTypes.FETCH_USER_SUCCESS,
            data,
        });

        expect(response).toEqual(
            initialState.merge({
                isFetchingUser: false,
                user: data,
                lastSuccessfulUserFetch: getCurrentDate(),
            }),
        );
    });

    it('should handle FETCH_USER_FAILURE', () => {
        const response = reducer(undefined, {
            type: actionTypes.FETCH_USER_FAILURE,
            error: ERROR,
        });

        expect(response).toEqual(
            initialState.merge({
                isFetchingUser: false,
                errorMsg: ERROR,
            }),
        );
    });

    it('should handle FETCH_REPOS', () => {
        const response = reducer(undefined, { type: actionTypes.FETCH_REPOS });

        expect(response).toEqual(
            initialState.merge({
                isFetchingRepos: true,
            }),
        );
    });

    it('should handle FETCH_REPOS_SUCCESS', () => {
        const data = 'repos data';
        const response = reducer(undefined, {
            type: actionTypes.FETCH_REPOS_SUCCESS,
            data,
        });

        expect(response).toEqual(
            initialState.merge({
                isFetchingUser: false,
                repos: data,
                lastSuccessfulReposFetch: getCurrentDate(),
            }),
        );
    });

    it('should handle FETCH_REPOS_FAILURE', () => {
        const response = reducer(undefined, {
            type: actionTypes.FETCH_REPOS_FAILURE,
            error: ERROR,
        });

        expect(response).toEqual(
            initialState.merge({
                isFetchingRepos: false,
                errorMsg: ERROR,
            }),
        );
    });

    it('should handle SELECT_REPO', () => {
        const selectedRepo = 773333;
        const response = reducer(undefined, {
            type: actionTypes.SELECT_REPO,
            data: selectedRepo,
        });

        expect(response).toEqual(initialState.merge({ selectedRepo }));
    });

    it('should handle RESET_SELECTED_REPO', () => {
        const response = reducer(undefined, {
            type: actionTypes.RESET_SELECTED_REPO,
        });

        expect(response).toEqual(initialState.merge({ selectedRepo: null }));
    });

    it('should handle DISMISS_ERROR', () => {
        const response = reducer(undefined, {
            type: actionTypes.DISMISS_ERROR,
        });

        expect(response).toEqual(initialState.merge({ errorMsg: null }));
    });
});
