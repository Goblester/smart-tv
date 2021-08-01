import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'


export const rootReducer = combineReducers({})


export const store = configureStore({
    reducer: rootReducer
})

// @ts-ignore
window.store = store

