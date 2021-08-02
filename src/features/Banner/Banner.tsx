import Button from '../../components/Button/Button';
import qr from './../../assets/images/qr-code.png'
import st from './Banner.module.scss';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../App/store';
import {AppStatusType} from '../Applicaton/application-reducer';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import {useActions} from '../../utils/redux-utils';
import {appActions} from '../Applicaton';
import {selectCurrentKey, selectStatus} from '../Applicaton/selectors';

const keyMap = [['ok']]

export const Banner = () => {
    const status = useSelector<AppRootStateType, AppStatusType>(selectStatus);
    const [show, setShow] = useState<boolean>(false);
    const curKey = useSelector<AppRootStateType, string | null>(selectCurrentKey);

    const {changeStatus, changeCurKeyMap} = useActions(appActions);

    useEffect(() => {
        changeCurKeyMap(keyMap);
    }, [changeCurKeyMap])

    useEffect(() => {
        if (status === 'idle') {
            let timeoutId = setTimeout(() => {
                setShow(true);
            }, 5000)
            return (() => {
                clearTimeout(timeoutId);
            })
        }
    }, [status]);

    const onOKClick = () => {
        setShow(false);
        show && changeStatus('enter');
    }
    const showBanner = show&&status === 'idle';
    const containerClassName = classNames(st.container, showBanner ? st.show : st.hide);

    return (
        <div className={st.alignContainer}>
            <div className={containerClassName}>
                <p>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! ПОДАРИТЕ ЕМУ СОБАКУ</p>
                <figure>
                    <img src={qr} alt={''}/>
                    <figcaption>Сканируйте QR-код или нажмите ОК</figcaption>
                </figure>
                <div className={st.btnContainer}>
                    <Button className={st.button}
                            onClick={onOKClick}
                    active={curKey === 'ok'}>OK</Button>
                </div>
            </div>
        </div>

    )
}

