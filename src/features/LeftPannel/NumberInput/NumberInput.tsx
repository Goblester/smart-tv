import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../App/store';
import Button from '../../../components/Button/Button';
import Checkbox from '../../../components/Checkbox/Checkbox';
import st from './NumberInput.module.scss';
import {DigitButtons} from './DigitButtons/DigitButtons';
import {useActions} from '../../../utils/redux-utils';
import {appActions, appSelectors} from '../../Applicaton';
import Input from '../../../components/Input/Input';
import classNames from 'classnames';
import {phoneNumberToString} from '../../../utils/ui-utils';
import {validateActions, validateSelectors} from '../../Validation';
import {IsLoadingType} from '../../Applicaton/application-reducer';


export const NumberInput: React.FC = () => {
    //state
    const {
        changePersonalDataAgreement,
        changeStatus,
        setLoading
    } = useActions(appActions);
    const {fetchValidation, changeValidation} = useActions(validateActions)
    const phoneNumberArr = useSelector<AppRootStateType, Array<number>>(appSelectors.selectPhoneNumber);
    const agreement = useSelector<AppRootStateType, boolean>(appSelectors.selectAgreement);
    const curKey = useSelector<AppRootStateType, string | null>(appSelectors.selectCurrentKey);
    const isLoading = useSelector<AppRootStateType, IsLoadingType>(appSelectors.selectIsLoading);
    const isValid = useSelector<AppRootStateType, boolean>(validateSelectors.selectIsValid);
    const phoneNumber = phoneNumberToString(phoneNumberArr);
    useEffect(() => {
        if (phoneNumberArr.length === 10) {
            changeValidation(false)
            fetchValidation();
        }
    }, [changeValidation, phoneNumberArr, fetchValidation])
    useEffect(() => {
        if (phoneNumberArr.length !== 10) {
            setLoading('idle')
        }
    }, [setLoading, phoneNumberArr, fetchValidation])
    //functions
    const onAgreementChange = useCallback(() => {
        changePersonalDataAgreement()
    }, [changePersonalDataAgreement]);
    const containerClasses = classNames(st.container)

    const onSubmitClick = useCallback(() => {
        changeStatus('succeeded');
    }, [changeStatus])

    const disableButton = phoneNumberArr.length !== 10 || !isValid;
    const error = isLoading === 'finished' && phoneNumberArr.length === 10 && !isValid;
    const phoneNumberText = classNames({[st.errorText]: error})
    return (
        <div className={containerClasses}>
            <h2>Введите ваш номер мобильного телефона</h2>
            <Input value={phoneNumber} className={st.hiddenInput}/>
            <p className={phoneNumberText}>{phoneNumber}</p>
            <p>и с Вами свяжется наш менеджер для дальнейшей консультации</p>
            <DigitButtons/>
            <div className={st.checkbox}>
                {error?
                    <p className={phoneNumberText}>НЕВЕРНО ВВЕДЁН НОМЕР</p>
                    :
                    <Checkbox checked={agreement}
                              onChangeChecked={onAgreementChange}
                              spanClassName={st.label}
                              active={curKey === 'check'}>Согласие на обработку персональных данных</Checkbox>}
            </div>
            <Button disabled={disableButton}
                    onClick={onSubmitClick}
                    className={st.submitButton}
                    red={error}
                    active={curKey === 'submit'}>ПОДТВЕРДИТЬ НОМЕР</Button>

        </div>
    )
}