import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from '../features/Applicaton';
import {validationReducer} from '../features/Validation';


export const rootReducer = combineReducers({
    app: appReducer,
    validation: validationReducer
})


export const store = configureStore({
    reducer: rootReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

