import {AppRootStateType} from '../App/store';

export type FieldErrorType = { field: string; error: string }
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }, state: AppRootStateType }
