import {AppRootStateType} from '../../App/store';

export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectPhoneNumber = (state: AppRootStateType) => state.app.phoneNumber;
export const selectAgreement = (state: AppRootStateType) => state.app.personalDataAgreement;
export const selectCoordinates = (state: AppRootStateType) => state.app.keyCoordinates;
export const selectKeyMap = (state: AppRootStateType) => state.app.curKeyMap;
export const selectCurrentKey = (state: AppRootStateType) => {
    const [y, x] = state.app.keyCoordinates;
    if(y === -1){
       return null
    }else{
        return state.app.curKeyMap[y][x];
    }

}

export const selectCompleted = (state: AppRootStateType) => state.app.phoneNumber.length === 10;


