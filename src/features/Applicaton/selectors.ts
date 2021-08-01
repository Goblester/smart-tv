import {AppRootStateType} from '../../App/store';

export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectPhoneNumber = (state: AppRootStateType) => state.app.phoneNumber;
