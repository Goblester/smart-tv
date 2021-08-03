import {CoordinatesShiftType, CoordinatesType} from '../features/Applicaton/application-reducer';
import {ActionCreatorsMapObject} from 'redux';


export const phoneNumberToString = (numbers: Array<number>) => {
    let phoneString = '+7(___)___-__-__'
    numbers.forEach(dig => {
        const index = phoneString.indexOf('_');
        if (index !== -1) {
            phoneString = phoneString.substr(0, index) + dig + phoneString.substr(index + 1);
        }
    })
    return phoneString;
}

export const limitCoordinates = (coordinates: CoordinatesType, shift: CoordinatesShiftType, keyMap: Array<Array<string>>): CoordinatesType => {
    let [y, x] = coordinates;
    if (y === -1) {
        return [0, 0];
    }
    const curKey = keyMap[y][x];
    const XBorder = keyMap[y].length - 1;
    const YBorder = keyMap.length - 1;
    while (true) {
        if (shift.x) {
            x += shift.x;
        }
        if (shift.y) {
            if (x === XBorder) {
                return coordinates;
            }
            y += shift.y;
        }

        if (y < 0 || x < 0 || y > YBorder || x > XBorder) {
            return coordinates;
        }

        const newKey = keyMap[y][x];
        if (curKey !== newKey) {
            return [y, x];
        }
    }
}

export const applyAction = (curKey: string | null, appActions: ActionCreatorsMapObject) => {

    if (!curKey) {
        return
    }
    if (/[0-9]/.test(curKey)) {
        const digit = Number(curKey);
        appActions.addDigit(digit);
    } else if (curKey === 'del') {
        appActions.deleteDigit();
    } else if (curKey === 'check') {
        appActions.changePersonalDataAgreement()
    } else if (curKey === 'submit') {
        appActions.changeStatus('succeeded');
    } else if (curKey === 'ok') {
        appActions.changeStatus('enter');
    } else if (curKey === 'x') {
        appActions.changeStatus('finished');
    }
}