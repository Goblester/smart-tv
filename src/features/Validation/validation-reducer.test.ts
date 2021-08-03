import {ValidationInitialStateType} from './validation-reducer';
import {validateActions, validationReducer} from './index';

let initState: ValidationInitialStateType;

beforeEach(() => {
    initState = {
        validation: false
    }

})

test('changeValidation should work correctly', () => {
    const action = validateActions.changeValidation(true);

    const newState = validationReducer(initState, action);

    expect(newState.validation).toBe(true);
    expect(initState.validation).toBe(false);

})
