import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export const slice = createSlice({
    name: 'app',
    initialState: {
        isLoading: 'idle',
        status: 'idle',
        phoneNumber: [],
        personalDataAgreement: false,
        keyCoordinates: [-1, -1],
        curKeyMap: [['ok']],
        currentTime: 0,
        error: undefined
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
        deleteDigit: (state) => {
            if (state.phoneNumber.length !== 0) {
                state.phoneNumber.pop();
            }
        },
        changePersonalDataAgreement: (state) => {
            state.personalDataAgreement = !state.personalDataAgreement;
        },
        changeKeyCoordinates: (state, action: PayloadAction<CoordinatesType>) => {
            state.keyCoordinates = action.payload;
        },
        changeCurKeyMap: (state, action: PayloadAction<KeyMapType>) => {
            state.curKeyMap = action.payload;
        },
        changeCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setLoading: (state, action: PayloadAction<isLoadingType>) => {
            state.error = action.payload;
        },
        setAppError: (state, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error;
        }
    },
})


//types

export type isLoadingType = 'loading' | 'failed' | 'finished' | 'idle'
export type AppStatusType = 'idle' | 'enter' | 'succeeded' | 'finished'
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
    //текущее время видео
    currentTime: number
    //ошибка всего приложения
    error: string | undefined
}

export type CoordinatesShiftType = {
    x?: number
    y?: number
}

export type CoordinatesType = [number, number]

export type KeyMapType = Array<Array<string>>
