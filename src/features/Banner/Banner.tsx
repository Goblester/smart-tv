import Button from '../../components/Button/Button';
import qr from './../../assets/images/qr-code.png'
import st from './Banner.module.scss';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../App/store';
import classNames from 'classnames';
import {useCallback, useEffect} from 'react';
import {useActions} from '../../utils/redux-utils';
import {appActions, appSelectors} from '../Applicaton';

const keyMap = [['ok']]

export const Banner = () => {
    //state
    const show = useSelector<AppRootStateType, boolean>(appSelectors.selectShowBanner);
    const curKey = useSelector<AppRootStateType, string | null>(appSelectors.selectCurrentKey);
    const isIdle = useSelector<AppRootStateType, boolean>(appSelectors.selectIsIdle);
    const {changeStatus, changeCurKeyMap, changeKeyCoordinates} = useActions(appActions);

    useEffect(() => {
        if (isIdle) {
            changeCurKeyMap(keyMap);
            changeKeyCoordinates([-1, -1]);
        }
    }, [isIdle, changeCurKeyMap, changeKeyCoordinates])

    //functions
    const onOKClick = useCallback(() => {
        show && changeStatus('enter');
    }, [show, changeStatus])

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

