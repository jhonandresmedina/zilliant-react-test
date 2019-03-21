//@vendor
import { combineReducers } from 'redux';

//@reducers
import github from '../reducers/githubReducer';

export const rootReducer = combineReducers({
    immGithub: github,
});
