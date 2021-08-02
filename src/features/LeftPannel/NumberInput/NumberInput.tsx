import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {selectAgreement, selectCurrentKey, selectPhoneNumber} from '../../Applicaton/selectors';
import {AppRootStateType} from '../../../App/store';
import Button from '../../../components/Button/Button';
import Checkbox from '../../../components/Checkbox/Checkbox';
import st from './NumberInput.module.scss';
import {DigitButtons} from './DigitButtons/DigitButtons';
import {useActions} from '../../../utils/redux-utils';
import {appActions} from '../../Applicaton';
import Input from '../../../components/Input/Input';
import classNames from 'classnames';
import {phoneNumberToString} from '../../../utils/ui-utils';


export const NumberInput: React.FC = () => {

    const {
        changePersonalDataAgreement,
        changeStatus
    } = useActions(appActions);
    const phoneNumberArr = useSelector<AppRootStateType, Array<number>>(selectPhoneNumber);
    const agreement = useSelector<AppRootStateType, boolean>(selectAgreement);
    const curKey = useSelector<AppRootStateType, string | null>(selectCurrentKey);
    const phoneNumber = phoneNumberToString(phoneNumberArr);
    const submitDisabled = phoneNumberArr.length !== 10;


    const onAgreementChange = useCallback((agreement: boolean) => {
        changePersonalDataAgreement(agreement)
    }, [changePersonalDataAgreement]);
    const containerClasses = classNames(st.container)

    const onSubmitClick = () => {
        changeStatus('succeeded');
    }


    return (
        <div className={containerClasses}>
            <h2>Введите ваш номер мобильного телефона</h2>
            <Input value={phoneNumber} className={st.hiddenInput}/>
            <p>{phoneNumber}</p>
            <p>и с Вами свяжется наш менеджер для дальнейшей консультации</p>
            <DigitButtons/>
            <Checkbox checked={agreement}
                      onChangeChecked={onAgreementChange}
                      spanClassName={st.label}
                      active={curKey === 'check'}>Согласие на обработку персональных данных</Checkbox>
            <Button disabled={submitDisabled}
                    onClick={onSubmitClick}
                    active={curKey === 'submit'}>ПОДТВЕРДИТЬ НОМЕР</Button>

        </div>
    )
}