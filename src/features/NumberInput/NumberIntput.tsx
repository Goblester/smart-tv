import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {selectAgreement, selectPhoneNumber} from '../Applicaton/selectors';
import {AppRootStateType} from '../../App/store';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import st from './NumberInput.module.scss';
import {DigitButtons} from './DigitButtons/DigitButtons';
import {useActions} from '../../utils/redux-utils';
import {appActions} from '../Applicaton';


const phoneNumberToString = (numbers: Array<number>) => {
    let phoneStr = '+7(___)___-__-__'
    numbers.forEach(dig => {
        const index = phoneStr.indexOf('_');
        if (index !== -1) {
            phoneStr = phoneStr.substr(0, index) + dig + phoneStr.substr(index + 1);
        }
    })
    return phoneStr;
}

export const NumberInput: React.FC = () => {

    const {changePersonalDataAgreement} = useActions(appActions);
    const phoneNumber = useSelector<AppRootStateType, Array<number>>(selectPhoneNumber);
    const agreement = useSelector<AppRootStateType, boolean>(selectAgreement);

    const onAgreementChange = useCallback((agreement: boolean) => {
        changePersonalDataAgreement(agreement)
    }, [])

    return (
        <div className={st.container}>
            <h2>Введите ваш номер мобильного телефона</h2>
            <input value={phoneNumberToString(phoneNumber)}/>
            <p>и с Вами свяжется наш менеджер для дальнейшей консультации</p>
            <DigitButtons/>
            <Checkbox checked={agreement}
                      onChangeChecked={onAgreementChange}
                      spanClassName={st.label}>Согласие на обработку персональных данных</Checkbox>
            <Button disabled={true}>ПОДТВЕРДИТЬ НОМЕР</Button>
        </div>
    )
}