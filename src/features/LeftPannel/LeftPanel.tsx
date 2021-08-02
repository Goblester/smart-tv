import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import st from './LeftPanel.module.scss';
import {AppRootStateType} from '../../App/store';
import {AppStatusType} from '../Applicaton/application-reducer';
import {selectCompleted, selectStatus} from '../Applicaton/selectors';
import classNames from 'classnames';
import {NumberInput} from './NumberInput/NumberInput';
import {SuccessScreen} from './SuccessScreen/SuccessScreen';
import {useActions} from '../../utils/redux-utils';
import {appActions} from '../Applicaton';
import {CloseButton} from '../CloseButton';

const inputKeyMap = [
    ['1', '2', '3', 'x'],
    ['4', '5', '6', 'x'],
    ['7', '8', '9', 'x'],
    ['del', 'del', '0', 'x'],
    ['check', 'check', 'check', 'x']
]

const completedInputKeyMap = [
    ['1', '2', '3', 'x'],
    ['4', '5', '6', 'x'],
    ['7', '8', '9', 'x'],
    ['del', 'del', '0', 'x'],
    ['check', 'check', 'check', 'x'],
    ['submit', 'submit', 'submit', 'x']
]


const successKeyMap = [
    ['x']
]


export const LeftPanel: React.FC = () => {
    const {
        changeCurKeyMap
    } = useActions(appActions)
    const status = useSelector<AppRootStateType, AppStatusType>(selectStatus);

    const isCompleted = useSelector<AppRootStateType, boolean>(selectCompleted);

    useEffect(() => {
        if (status === 'enter') {
            changeCurKeyMap(inputKeyMap);
        } else if (status === 'succeeded') {
            changeCurKeyMap(successKeyMap);
        }
    }, [status, changeCurKeyMap])

    useEffect(() => {
        if (status === 'enter') {
            changeCurKeyMap(inputKeyMap);
        } else if (status === 'succeeded') {
            changeCurKeyMap(successKeyMap);
        }
    }, [status, changeCurKeyMap])

    useEffect(() => {
        if (isCompleted) {
            changeCurKeyMap(completedInputKeyMap);
        }
    }, [isCompleted, changeCurKeyMap])

    const containerClasses = classNames(st.container, status !== 'idle' ? st.show : st.hide);

    return (
        <div className={containerClasses}>
            {status === 'enter' && <NumberInput/>}
            {status === 'succeeded' && <SuccessScreen/>}
            {status !== 'idle' && <CloseButton/>}
        </div>
    )
}