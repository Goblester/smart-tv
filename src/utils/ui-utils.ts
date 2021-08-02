import {CoordinatesShiftType, CoordinatesType} from '../features/Applicaton/application-reducer';


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