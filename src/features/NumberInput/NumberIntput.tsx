import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectPhoneNumber} from '../Applicaton/selectors';
import {AppRootStateType} from '../../App/store';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import st from './NumberInput.module.scss';
import classNames from 'classnames';

export const NumberInput: React.FC = () => {

    const phoneNumber = useSelector<AppRootStateType, string>(selectPhoneNumber);
    const buttonsArray: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'стереть', 0];

    const [checked, setChecked] = useState(false);


    const buttonClass = classNames({[st.outBtn]: true})

    return (
        <div className={st.container}>
            <h2>Введите ваш номер мобильного телефона</h2>
            <input value={phoneNumber}/>
            <p>и с Вами свяжется наш менеджер для дальнейшей консультации</p>
            <div className={st.buttons}>
                {buttonsArray.map(ind => <Button className={buttonClass}>{ind}</Button>)}
            </div>

            <Checkbox checked={checked}
                      onChangeChecked={setChecked}
                      spanClassName={st.label}>Согласие на обработку персональных данных</Checkbox>
            <Button disabled={true}>ПОДТВЕРДИТЬ НОМЕР</Button>
        </div>
    )
}