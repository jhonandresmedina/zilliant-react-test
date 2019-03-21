//@actionTypes
import actionTypes from '../constants/actionTypes';
import axios from 'axios';
import config from '../config';

const fetchUser = () => ({
    type: actionTypes.FETCH_USER,
});

const fetchUserSuccess = data => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    data,
});

const fetchUserFailure = error => ({
    type: actionTypes.FETCH_USER_FAILURE,
    error,
});

const fetchRepos = () => ({
    type: actionTypes.FETCH_REPOS,
});

const fetchReposSuccess = data => ({
    type: actionTypes.FETCH_REPOS_SUCCESS,
    data,
});

const fetchReposFailure = error => ({
    type: actionTypes.FETCH_REPOS_FAILURE,
    error,
});

const selectRepo = repo => ({
    type: actionTypes.SELECT_REPO,
    data: repo,
});

const resetSelectedRepo = () => ({
    type: actionTypes.RESET_SELECTED_REPO,
});

const dismissError = () => ({
    type: actionTypes.DISMISS_ERROR,
});

const fetchUserRequest = () => dispatch => {
    dispatch(fetchUser());

    return axios
        .get(`${config.baseUrl}/users/${config.user}`)
        .then(response => {
            dispatch(fetchUserSuccess(response.data));
        })
        .catch(() => {
            dispatch(fetchUserFailure('Could not fetch User :('));
        });
};

const fetchReposRequest = () => dispatch => {
    dispatch(fetchRepos());

    return axios
        .get(`${config.baseUrl}/users/${config.user}/repos`)
        .then(response => {
            dispatch(fetchReposSuccess(response.data));
        })
        .catch(() => {
            dispatch(fetchReposFailure('Could not fetch Repos :('));
        });
};

export { fetchUserRequest, fetchReposRequest, selectRepo, resetSelectedRepo, dismissError };
