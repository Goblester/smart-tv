import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        phoneNumber: '+7(___)___-__-__'
    } as AppInitialStateType,
    reducers: {
        changeStatus: (state, action: PayloadAction<AppStatusType>)=>{
            state.status = action.payload;
        },
        changePhoneNumber: (state, action: PayloadAction<string>)=>{
            state.phoneNumber = action.payload;
        }
    },
})

//types

export type AppStatusType = 'idle' | 'enter' | 'succeeded'
export type AppInitialStateType = {
    // в каком состоянии находится пользовательский интерфейс
    status: AppStatusType
    // вводимый телефонный номер
    phoneNumber: string
}
