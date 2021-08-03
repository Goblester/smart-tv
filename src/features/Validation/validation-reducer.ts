import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ThunkError} from '../../utils/types';
import {handleAsyncServerNetworkError} from '../../utils/error-utils';
import {appActions} from '../Applicaton';
import {validationAPI} from '../../api/smart-tv-api';

const {setLoading} = appActions;

const fetchValidation = createAsyncThunk<{ validation: boolean }, undefined, ThunkError>('smart-tv/', async (param, thunkAPI) => {
    thunkAPI.dispatch(setLoading('loading'))
    const state = thunkAPI.getState();
    const numberArr = state.app.phoneNumber;
    const number = numberArr.join('');
    try {
        const res = await validationAPI.validate(number);
        thunkAPI.dispatch(setLoading('finished'));
        return res.data.valid;
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI);
    }
})


export const slice = createSlice({
    name: 'validation',
    initialState: {
        validation: false
    } as ValidationInitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchValidation.fulfilled, (state, action) => {
            state.validation = action.payload.validation;
        })
    }
})

export const asyncActions = {
    fetchValidation
}

//types

export type ValidationInitialStateType = {
    // в каком состоянии находится пользовательский интерфейс
    validation: boolean
}
