import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {selectAgreement, selectPhoneNumber, selectStatus} from '../Applicaton/selectors';
import {AppRootStateType} from '../../App/store';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import st from './NumberInput.module.scss';
import {DigitButtons} from './DigitButtons/DigitButtons';
import {useActions} from '../../utils/redux-utils';
import {appActions} from '../Applicaton';
import Input from '../../components/Input/Input';
import {AppStatusType} from '../Applicaton/application-reducer';
import classNames from 'classnames';


const phoneNumberToString = (numbers: Array<number>) => {
    let phoneString = '+7(___)___-__-__'
    numbers.forEach(dig => {
        const index = phoneString.indexOf('_');
        if (index !== -1) {
            phoneString = phoneString.substr(0, index) + dig + phoneString.substr(index + 1);
        }
    })
    return phoneString;
}

export const NumberInput: React.FC = () => {
    const {changePersonalDataAgreement} = useActions(appActions);
    const phoneNumberArr = useSelector<AppRootStateType, Array<number>>(selectPhoneNumber);
    const status = useSelector<AppRootStateType, AppStatusType>(selectStatus);
    const agreement = useSelector<AppRootStateType, boolean>(selectAgreement);
    const phoneNumber = phoneNumberToString(phoneNumberArr);
    const submitDisabled = phoneNumberArr.length !== 10;

    const onAgreementChange = useCallback((agreement: boolean) => {
        changePersonalDataAgreement(agreement)
    }, []);
    const containerClasses = classNames(st.container, st.show /*status === 'enter' ? st.show : st.hide*/)

    return (
        <div className={containerClasses}>
            <h2>Введите ваш номер мобильного телефона</h2>
            <Input value={phoneNumber} className={st.hiddenInput}/>
            <p>{phoneNumber}</p>
            <p>и с Вами свяжется наш менеджер для дальнейшей консультации</p>
            <DigitButtons/>
            <Checkbox checked={agreement}
                      onChangeChecked={onAgreementChange}
                      spanClassName={st.label}>Согласие на обработку персональных данных</Checkbox>
            <Button disabled={submitDisabled}>ПОДТВЕРДИТЬ НОМЕР</Button>
        </div>
    )
}