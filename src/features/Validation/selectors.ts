import {AppRootStateType} from '../../App/store';

export const selectIsValid = (state: AppRootStateType) => {
    return state.app.isLoading === 'finished' && state.validation.validation;
}


