import Button from '../../components/Button/Button';
import qr from './../../assets/images/qr-code.png'
import st from './Banner.module.scss';

export const Banner = () => {
    return (
        <div className={st.container}>
            <p>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! ПОДАРИТЕ ЕМУ СОБАКУ</p>
            <figure>
                <img src={qr}
                     alt={''}/>
                <figcaption>Сканируйте QR-код или нажмите ОК</figcaption>
            </figure>
            <div className={st.btnContainer}>
                <Button className={st.button}>OK</Button>
            </div>
        </div>
    )
}

