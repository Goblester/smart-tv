import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import st from './LeftPanel.module.scss';
import {AppRootStateType} from '../../App/store';
import {AppStatusType, CoordinatesShiftType, CoordinatesType, KeyMapType} from '../Applicaton/application-reducer';
import {
    selectAgreement,
    selectCoordinates,
    selectCurrentKey,
    selectKeyMap,
    selectStatus
} from '../Applicaton/selectors';
import classNames from 'classnames';
import {NumberInput} from './NumberInput/NumberInput';
import {SuccessScreen} from './SuccessScreen/SuccessScreen';
import {useActions} from '../../utils/redux-utils';
import {appActions} from '../Applicaton';
import {limitCoordinates} from '../../utils/ui-utils';

const inputKeyMap = [
    ['1', '2', '3', 'x'],
    ['4', '5', '6', 'x'],
    ['7', '8', '9', 'x'],
    ['del', 'del', '0', 'x'],
    ['check', 'check', 'check', 'x'],
    ['submit', 'submit', 'submit', 'x'],
]

const successKeyMap = [
    ['x']
]


export const LeftPanel: React.FC = () => {
    const {
        changeCurKeyMap,
        addDigit,
        deleteDigit,
        changeKeyCoordinates,
        changePersonalDataAgreement,
        changeStatus
    } = useActions(appActions)
    const status = useSelector<AppRootStateType, AppStatusType>(selectStatus);
    const coordinates = useSelector<AppRootStateType, CoordinatesType>(selectCoordinates);
    const keyMap = useSelector<AppRootStateType, KeyMapType>(selectKeyMap);
    const curKey = useSelector<AppRootStateType, string | null>(selectCurrentKey);
    const agreement = useSelector<AppRootStateType, boolean>(selectAgreement);

    useEffect(() => {
        if (status === 'enter') {
            changeCurKeyMap(inputKeyMap);
        } else if (status === 'succeeded') {
            changeCurKeyMap(successKeyMap);
        }
    }, [status, changeCurKeyMap])
    debugger;

    const onKeyDown = useCallback(({key}: KeyboardEvent) => {
        debugger;
        let shift: CoordinatesShiftType | null = null;
        switch (true) {
            case /[0-9]/.test(key):
                const digit = Number(key);
                addDigit(digit);
                break;
            case key === 'Backspace':
                deleteDigit();
                break;
            case key === 'ArrowLeft':
                shift = {x: -1};
                break;
            case key === 'ArrowRight':
                shift = {x: 1};
                break;
            case key === 'ArrowUp':
                shift = {y: -1};
                break;
            case key === 'ArrowDown':
                shift = {y: 1};
                break;
            case key === 'Enter':
                if (!curKey) {
                    return
                }
                if (/[0-9]/.test(curKey)) {
                    const digit = Number(curKey);
                    addDigit(digit);
                } else if (curKey === 'del') {
                    deleteDigit();
                } else if (curKey === 'check') {
                    changePersonalDataAgreement(!agreement)
                } else if (curKey === 'submit') {
                    changeStatus('succeeded');
                }
        }
        if (shift) {
            const newCoordinates = limitCoordinates(coordinates, shift, keyMap);
            changeKeyCoordinates(newCoordinates);
        }

    }, [addDigit, deleteDigit, coordinates, keyMap, changeKeyCoordinates, curKey, agreement, changePersonalDataAgreement, changeStatus])

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [onKeyDown])

    const containerClasses = classNames(st.container, status !== 'idle' ? st.show : st.hide);

    return (
        <div className={containerClasses}>
            {status === 'enter' && <NumberInput/>}
            {status === 'succeeded' && <SuccessScreen/>}
        </div>
    )
}