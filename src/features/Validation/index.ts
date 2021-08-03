import {slice, asyncActions}  from './validation-reducer';
import * as validateSelectors from './selectors';

const validationReducer = slice.reducer;



const validateActions = {
    ...slice.actions,
    ...asyncActions
}

export {
    validationReducer,
    validateActions,
    validateSelectors
}