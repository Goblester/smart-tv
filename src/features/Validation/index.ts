import {slice, asyncActions}  from './validation-reducer';

const validationReducer = slice.reducer;



const validateActions = {
    ...slice.actions,
    ...asyncActions
}

export {
    validationReducer,
    validateActions
}