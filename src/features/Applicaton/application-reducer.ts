import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        phoneNumber: [],
        personalDataAgreement: false,
        keyCoordinates: [-1, -1],
        curKeyMap: [['ok']]
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
        },
        changeKeyCoordinates: (state, action: PayloadAction<CoordinatesType>) => {
            state.keyCoordinates = action.payload;
        },
        changeCurKeyMap: (state, action: PayloadAction<KeyMapType>) => {
            state.curKeyMap = action.payload;
            state.keyCoordinates = [-1,-1];

        }
    },
})

//types



export type AppStatusType = 'idle' | 'enter' | 'succeeded'
export type ActiveButtontType = 'digit' | ''
export type AppInitialStateType = {
    // в каком состоянии находится пользовательский интерфейс
    status: AppStatusType
    // вводимый телефонный номер
    phoneNumber: Array<number>
    //согласие на обработку персональных данных
    personalDataAgreement: boolean
    //координаты активной кнопки
    keyCoordinates: [number, number]
    //текущая карта кнопок
    curKeyMap: KeyMapType
}

export type CoordinatesShiftType = {
    x?: number
    y?: number
}

export type CoordinatesType = [number, number]

export type KeyMapType = Array<Array<string>>
