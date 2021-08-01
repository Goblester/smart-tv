import {AppInitialStateType} from './application-reducer';
import {appActions, appReducer} from './index';

let initState: AppInitialStateType;

beforeEach(()=>{
    initState = {
        status: 'idle',
        phoneNumber: ''
    }

})

test('changeAppStatus should work correctly',()=>{
    const action = appActions.changeStatus('enter');

    const newState = appReducer(initState, action);

    expect(newState.status).toBe('enter');
    expect(newState.phoneNumber).toBe('');
})


test('changePhoneNumber should work correctly',()=>{
    const action = appActions.changePhoneNumber('+7-981');

    const newState = appReducer(initState, action);

    expect(newState.status).toBe('idle');
    expect(newState.phoneNumber).toBe('+7-981');
})