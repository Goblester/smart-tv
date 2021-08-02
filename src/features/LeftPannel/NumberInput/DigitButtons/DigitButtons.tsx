import React from 'react';
import st from '../NumberInput.module.scss';
import Button from '../../../../components/Button/Button';
import classNames from 'classnames';
import {useActions} from '../../../../utils/redux-utils';
import {appActions, appSelectors} from '../../../Applicaton';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../App/store';

const buttonsArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0];


export const DigitButtons: React.FC = () => {
    const {addDigit, deleteDigit} = useActions(appActions);
    const curKey = useSelector<AppRootStateType, string | null>(appSelectors.selectCurrentKey);
    return (
        <div className={st.buttons}>
            {buttonsArray.map(ind => {
                const isDeleteButton = ind === -1;
                const isActiveButton = isDeleteButton ? curKey === 'del' : curKey === `${ind}`;
                const buttonClass = classNames({[st.outBtn]: true, [st.deleteBtn]: isDeleteButton})

                const content = isDeleteButton ? 'СТЕРЕТЬ' : ind;

                const onBtnClick = () => {
                    if (ind === -1) {
                        deleteDigit();
                    } else {
                        addDigit(ind);
                    }
                }

                return (
                    <Button key={ind}
                            className={buttonClass}
                            onClick={onBtnClick}
                            active={isActiveButton}>{content}</Button>
                )

            })}
        </div>
    )
}