//@vendor
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//@rootReducer
import { rootReducer } from './rootReducer';

const configureStore = () => {
    const middleware = [thunk];

    return createStore(rootReducer, applyMiddleware(...middleware));
};

export default configureStore;
