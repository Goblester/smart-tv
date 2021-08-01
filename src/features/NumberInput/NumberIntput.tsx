import React from 'react';
import {useSelector} from 'react-redux';
import {selectPhoneNumber} from '../Applicaton/selectors';
import {AppRootStateType} from '../../App/store';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import st from './NumberInput.module.scss';

export const NumberInput: React.FC = () => {

    const phoneNumber = useSelector<AppRootStateType, string>(selectPhoneNumber);
    const buttonsArray: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    return (
        <div className={st.container}>
            <h2>Введите ваш номер мобильного телефона</h2>
            <input value={phoneNumber}/>
            <p>и с Вами свяжется наш менеджер для дальнейшей консультации</p>
            <div>
                {buttonsArray.map(ind => <Button>{ind}</Button>)}
            </div>
            <Checkbox>Согласие на обработку персональных данных</Checkbox>
            <Button>Подтвердить номер</Button>
        </div>
    )
}