import Button from '../../components/Button/Button';
import qr from './../../assets/images/qr-code.png'
import st from './Banner.module.scss';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../App/store';
import classNames from 'classnames';
import {useEffect} from 'react';
import {useActions} from '../../utils/redux-utils';
import {appActions} from '../Applicaton';
import {selectCurrentKey, selectIdle, selectShowBanner} from '../Applicaton/selectors';

const keyMap = [['ok']]

export const Banner = () => {
    const show = useSelector<AppRootStateType, boolean>(selectShowBanner);
    const curKey = useSelector<AppRootStateType, string | null>(selectCurrentKey);
    const isIdle = useSelector<AppRootStateType, boolean>(selectIdle);

    const {changeStatus, changeCurKeyMap} = useActions(appActions);

    useEffect(() => {
        if (isIdle) {
            changeCurKeyMap(keyMap);
        }
    }, [isIdle, changeCurKeyMap])


    const onOKClick = () => {
        show && changeStatus('enter');
    }
    const showBanner = show && isIdle;
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

