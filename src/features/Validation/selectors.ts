import {AppRootStateType} from '../../App/store';

export const selectIsValid = (state: AppRootStateType) => state.validation.validation;


