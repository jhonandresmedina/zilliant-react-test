//@vendor
import { fromJS } from 'immutable';

//@actionTypes
import actionTypes from '../constants/actionTypes';

//@utilities
import { getCurrentDate } from '../utilities/dateUtilities';

export const setInitialState = fromJS({
    user: null,
    repos: [],
    selectedRepo: null,
    isFetchingUser: false,
    isFetchingRepos: false,
    errorMsg: null,
    lastSuccessfulUserFetch: null,
    lastSuccessfulReposFetch: null,
});

const githubReducer = (state = setInitialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER:
            return state.merge({ isFetchingUser: true });
        case actionTypes.FETCH_USER_SUCCESS:
            return state.merge({
                isFetchingUser: false,
                user: action.data,
                lastSuccessfulUserFetch: getCurrentDate(),
            });
        case actionTypes.FETCH_USER_FAILURE:
            return state.merge({
                isFetchingUser: false,
                errorMsg: action.error,
            });
        case actionTypes.FETCH_REPOS:
            return state.merge({ isFetchingRepos: true });
        case actionTypes.FETCH_REPOS_SUCCESS:
            return state.merge({
                isFetchingRepos: false,
                repos: action.data,
                lastSuccessfulReposFetch: getCurrentDate(),
            });
        case actionTypes.FETCH_REPOS_FAILURE:
            return state.merge({
                isFetchingRepos: false,
                errorMsg: action.error,
            });
        case actionTypes.SELECT_REPO:
            return state.merge({
                selectedRepo: action.data,
            });
        case actionTypes.RESET_SELECTED_REPO:
            return state.merge({
                selectedRepo: null,
            });
        case actionTypes.DISMISS_ERROR:
            return state.merge({
                errorMsg: null,
            });
        default:
            return setInitialState;
    }
};

export default githubReducer;
