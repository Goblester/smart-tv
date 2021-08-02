import React, {useCallback, useEffect} from 'react';
import {Banner} from '../features/Banner';
import {LeftPanel} from '../features/LeftPannel';
import st from './App.module.scss';
import {CoordinatesShiftType, CoordinatesType, KeyMapType} from '../features/Applicaton/application-reducer';
import {limitCoordinates} from '../utils/ui-utils';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {selectAgreement, selectCoordinates, selectCurrentKey, selectKeyMap} from '../features/Applicaton/selectors';
import {useActions} from '../utils/redux-utils';
import {appActions} from '../features/Applicaton';
import {YoutubeEmbed} from '../features/Video/YoutubeEmbed';

function App() {

    const {
        addDigit,
        deleteDigit,
        changeKeyCoordinates,
        changePersonalDataAgreement,
        changeStatus
    } = useActions(appActions)

    const coordinates = useSelector<AppRootStateType, CoordinatesType>(selectCoordinates);
    const keyMap = useSelector<AppRootStateType, KeyMapType>(selectKeyMap);
    const curKey = useSelector<AppRootStateType, string | null>(selectCurrentKey);
    const agreement = useSelector<AppRootStateType, boolean>(selectAgreement);

    const onKeyDown = useCallback(({key}: KeyboardEvent) => {
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
                } else if (curKey === 'ok') {
                    changeStatus('enter');
                } else if (curKey === 'x') {
                    changeStatus('idle');
                }
        }
        if (shift) {
            const newCoordinates = limitCoordinates(coordinates, shift, keyMap);
            changeKeyCoordinates(newCoordinates);
        }

    }, [addDigit, deleteDigit, coordinates, keyMap, changeKeyCoordinates, curKey, agreement, changePersonalDataAgreement, changeStatus])

    const onClick = useCallback(() => {
        changeKeyCoordinates([-1, -1]);
    }, [changeKeyCoordinates])

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('click', onClick);
        }
    }, [onKeyDown, onClick])


    return (
        <div className={st.App}>
            <LeftPanel/>
            <Banner/>
            <YoutubeEmbed embedId={'dbvi_S3fy2M'}/>
        </div>
    );
}

export default App;
