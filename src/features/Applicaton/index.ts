import {slice} from './application-reducer';
import * as appSelectors from './selectors';

const appReducer = slice.reducer;

const appActions = slice.actions


export {
    appSelectors,
    appReducer,
    appActions
}