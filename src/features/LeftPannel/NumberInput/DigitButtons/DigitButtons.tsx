import React, {useState} from 'react';
import st from '../NumberInput.module.scss';
import Button from '../../../../components/Button/Button';
import classNames from 'classnames';
import {useActions} from '../../../../utils/redux-utils';
import {appActions} from '../../../Applicaton';

export const DigitButtons: React.FC = () => {
    const [activeButton, setActiveButton] = useState<number | null>()
    const {addDigit, deleteDigit} = useActions(appActions);

    const buttonsArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0];

    return (
        <div className={st.buttons}>
            {buttonsArray.map(ind => {
                const isDeleteButton = ind === -1;
                const isActiveButton = ind === activeButton;
                const buttonClass = classNames({[st.outBtn]: !isActiveButton, [st.deleteBtn]: isDeleteButton})

                const content = isDeleteButton ? 'СТЕРЕТЬ' : ind;

                const onBtnClick = () => {
                    if (ind === -1) {
                        deleteDigit();
                    } else {
                        addDigit(ind);
                    }
                }

                return (
                    <Button className={buttonClass} onClick={onBtnClick}>{content}</Button>
                )

            })}
        </div>
    )
}