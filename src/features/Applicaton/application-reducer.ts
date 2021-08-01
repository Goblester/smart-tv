import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        phoneNumber: [],
        personalDataAgreement: false
    } as AppInitialStateType,
    reducers: {
        changeStatus: (state, action: PayloadAction<AppStatusType>) => {
            state.status = action.payload;
        },
        addDigit: (state, action: PayloadAction<number>) => {
            if (state.phoneNumber.length !== 10 && action.payload > -1 && action.payload < 10) {
                state.phoneNumber.push(action.payload)
            }
        },
        deleteDigit: (state, action: PayloadAction) => {
            if (state.phoneNumber.length !== 0) {
                state.phoneNumber.pop();
            }
        },
        changePersonalDataAgreement: (state, action: PayloadAction<boolean>) => {
            state.personalDataAgreement = action.payload;
        }
    },
})

//types

export type AppStatusType = 'idle' | 'enter' | 'succeeded'
export type AppInitialStateType = {
    // в каком состоянии находится пользовательский интерфейс
    status: AppStatusType
    // вводимый телефонный номер
    phoneNumber: Array<number>
    //согласие на обработку персональных данных
    personalDataAgreement: boolean
}
