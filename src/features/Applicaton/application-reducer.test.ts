import {AppInitialStateType} from './application-reducer';
import {appActions, appReducer} from './index';

let initState: AppInitialStateType;

beforeEach(() => {
    initState = {
        status: 'idle',
        phoneNumber: [9, 9, 9, 1, 2, 3, 2, 3, 2],
        personalDataAgreement: false,
        keyCoordinates: [0,0],
        curKeyMap: [['ok']]
    }

})

test('changeAppStatus should work correctly', () => {
    const action = appActions.changeStatus('enter');

    const newState = appReducer(initState, action);

    expect(newState.status).toBe('enter');
    expect(newState.personalDataAgreement).toBe(false);
    expect(newState.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3, 2]);
})


test('addDigit should work correctly', () => {
    const action = appActions.addDigit(9);

    const newState = appReducer(initState, action);

    expect(newState.status).toBe('idle');
    expect(newState.personalDataAgreement).toBe(false);
    expect(newState.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3, 2, 9]);

    const newState1 = appReducer(newState, action);
    expect(newState1.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3, 2, 9]);
})


test('deleteDigit should work correctly', () => {
    const action = appActions.deleteDigit();

    const newState = appReducer(initState, action);

    expect(newState.status).toBe('idle');
    expect(newState.personalDataAgreement).toBe(false);
    expect(newState.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3]);
    initState.phoneNumber = [];
    const newState1 = appReducer(initState, action);
    expect(newState1.phoneNumber).toEqual([]);
})

test('changePersonalDataAgreement should work correctly', () => {
    const action = appActions.changePersonalDataAgreement(true);

    const newState = appReducer(initState, action);

    expect(newState.personalDataAgreement).toBe(true)
    expect(newState.status).toBe('idle');
    expect(newState.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3, 2]);
})

test('changeKeyCoordinates should work correctly', () => {
    let action = appActions.changeKeyCoordinates([0,1]);
    let newState = appReducer(initState, action);

    expect(newState.personalDataAgreement).toBe(false)
    expect(newState.status).toBe('idle');
    expect(newState.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3, 2]);
    expect(newState.keyCoordinates).toEqual([0, 1]);

    action = appActions.changeKeyCoordinates([1,0]);
    newState = appReducer(initState, action);

    expect(newState.keyCoordinates).toEqual([1, 0]);
})


test('changeCurKeyMap should work correctly', () => {
    let action = appActions.changeCurKeyMap([['ok', 'x']]);
    let newState = appReducer(initState, action);

    expect(newState.curKeyMap).toEqual([['ok', 'x']]);
    expect(newState.keyCoordinates).toEqual([-1, -1]);
})