//@vendor
import { createStore } from 'redux';

//@reducers
import { rootReducer } from '../../store/rootReducer';
import githubReducer from '../../reducers/githubReducer';

describe('root reducer', () => {
    let store;

    beforeEach(() => {
        store = createStore(rootReducer);
    });

    it('get reducers correctly ', () => {
        expect(store.getState().immGithub).toEqual(githubReducer(undefined, {}));
    });
});
