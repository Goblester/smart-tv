import {AppInitialStateType} from './application-reducer';
import {appActions, appReducer} from './index';

let initState: AppInitialStateType;

beforeEach(() => {
    initState = {
        status: 'idle',
        phoneNumber: [9, 9, 9, 1, 2, 3, 2, 3, 2],
        personalDataAgreement: false,
        keyCoordinates: [0, 0],
        curKeyMap: [['ok']],
        currentTime: 0,
        error: undefined,
        isLoading: 'idle'
    }

})

test('changeAppStatus should work correctly', () => {
    const action = appActions.changeStatus('enter');

    const newState = appReducer(initState, action);

    expect(initState.status).toBe('idle');
    expect(newState.status).toBe('enter');

})


test('addDigit should work correctly', () => {
    const action = appActions.addDigit(9);

    const newState = appReducer(initState, action);


    expect(initState.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3, 2]);
    expect(newState.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3, 2, 9]);

    const newState1 = appReducer(newState, action);
    expect(newState1.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3, 2, 9]);
})


test('deleteDigit should work correctly', () => {
    const action = appActions.deleteDigit();

    const newState = appReducer(initState, action);

    expect(initState.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3, 2]);
    expect(newState.phoneNumber).toEqual([9, 9, 9, 1, 2, 3, 2, 3]);
    initState.phoneNumber = [];
    const newState1 = appReducer(initState, action);
    expect(newState1.phoneNumber).toEqual([]);
})

test('changePersonalDataAgreement should work correctly', () => {
    const action = appActions.changePersonalDataAgreement();

    const newState = appReducer(initState, action);

    expect(initState.personalDataAgreement).toBe(false)
    expect(newState.personalDataAgreement).toBe(true)
})

test('changeKeyCoordinates should work correctly', () => {
    let action = appActions.changeKeyCoordinates([0, 1]);
    let newState = appReducer(initState, action);


    expect(initState.keyCoordinates).toEqual([0, 0]);
    expect(newState.keyCoordinates).toEqual([0, 1]);
})


test('changeCurKeyMap should work correctly', () => {
    let action = appActions.changeCurKeyMap([['ok', 'x']]);
    let newState = appReducer(initState, action);

    expect(initState.curKeyMap).toEqual([['ok']]);

    expect(newState.curKeyMap).toEqual([['ok', 'x']]);
})

test('changeCurrentTime should work correctly', () => {
    let action = appActions.changeCurrentTime(2);
    let newState = appReducer(initState, action);

    expect(newState.currentTime).toBe(2);
    expect(initState.currentTime).toBe(0);
})


test('setAppError should work correctly', () => {
    let action = appActions.setAppError({error:'error'});
    let newState = appReducer(initState, action);

    expect(newState.error).toBe('error');
    expect(initState.error).toBe(undefined);
})


test('setIsLoading should work correctly', () => {
    let action = appActions.setLoading('finished');
    let newState = appReducer(initState, action);

    expect(newState.isLoading).toBe('finished');
    expect(initState.isLoading).toBe('idle');
})