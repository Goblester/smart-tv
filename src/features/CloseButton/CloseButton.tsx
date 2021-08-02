import React from 'react';
import Button from '../../components/Button/Button';
import st from './CloseButton.module.scss';
import classNames from 'classnames';

export const CloseButton: React.FC = () => {

    const buttonClassName = classNames(st.activeBtn, {[st.currentBtn]: false})

    return (
        <div className={st.container}>
            <Button active={false}
                    className={buttonClassName}>
                <svg viewBox="0 0 23 23">
                    <line x1="1" y1="1" x2="22" y2="22"/>
                    <line x1="22" y1="1" x2="1" y2="22"/>
                </svg>
            </Button>
        </div>
    )
}