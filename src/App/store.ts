import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from '../features/Applicaton';


export const rootReducer = combineReducers({
    app: appReducer
})


export const store = configureStore({
    reducer: rootReducer
})

export type AppStoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

