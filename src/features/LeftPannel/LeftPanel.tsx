import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import st from './LeftPanel.module.scss';
import {AppRootStateType} from '../../App/store';
import {AppStatusType} from '../Applicaton/application-reducer';
import classNames from 'classnames';
import {NumberInput} from './NumberInput/NumberInput';
import {SuccessScreen} from './SuccessScreen/SuccessScreen';
import {useActions} from '../../utils/redux-utils';
import {appActions, appSelectors} from '../Applicaton';
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
    //state
    const {
        changeCurKeyMap,
        changeKeyCoordinates
    } = useActions(appActions)
    const status = useSelector<AppRootStateType, AppStatusType>(appSelectors.selectStatus);
    const showHood = useSelector<AppRootStateType, boolean>(appSelectors.selectShowHood);
    const isCompleted = useSelector<AppRootStateType, boolean>(appSelectors.selectCompleted);

    useEffect(() => {
        if (status === 'enter') {
            changeCurKeyMap(inputKeyMap);
        } else if (status === 'succeeded') {
            changeCurKeyMap(successKeyMap);
            changeKeyCoordinates([-1, -1])
        }
    }, [status, changeCurKeyMap, changeKeyCoordinates])

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

    //functions

    const containerClasses = classNames(st.container, showHood ? st.show : st.hide);

    return (
        <div className={containerClasses}>
            {status === 'enter' && <NumberInput/>}
            {status === 'succeeded' && <SuccessScreen/>}
            {showHood && <CloseButton/>}
        </div>
    )
}