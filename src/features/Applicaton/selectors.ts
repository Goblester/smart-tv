import {AppRootStateType} from '../../App/store';

export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectPhoneNumber = (state: AppRootStateType) => state.app.phoneNumber;
export const selectAgreement = (state: AppRootStateType) => state.app.personalDataAgreement;
