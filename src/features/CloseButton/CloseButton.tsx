import React from 'react';
import Button from '../../components/Button/Button';
import st from './CloseButton.module.scss';
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../App/store';
import {useActions} from '../../utils/redux-utils';
import {appActions, appSelectors} from '../Applicaton';

export const CloseButton: React.FC = () => {
    const {changeStatus} = useActions(appActions);
    const curKey = useSelector<AppRootStateType, string | null>(appSelectors.selectCurrentKey);
    const isCurrentButton = curKey === 'x';
    const buttonClassName = classNames(st.activeBtn, {[st.currentBtn]: isCurrentButton})

    const onCloseButtonClick = () => {
        changeStatus('finished');
    }

    return (
        <div className={st.container}>
            <Button className={buttonClassName}
                    active={isCurrentButton}
                    onClick={onCloseButtonClick}>
                <svg viewBox="0 0 23 23">
                    <line x1="1" y1="1" x2="22" y2="22"/>
                    <line x1="22" y1="1" x2="1" y2="22"/>
                </svg>
            </Button>
        </div>
    )
}