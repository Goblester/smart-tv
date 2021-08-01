import qr from './../../assets/images/qr-code.png'

export const Banner = () => {
    return (
        <div>
            <p>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! ПОДАРИТЕ ЕМУ СОБАКУ</p>
            <figure>
                <img src={qr}
                     alt={''} />
                    <figcaption>Сканируйте QR-код или нажмите ОК</figcaption>
            </figure>
            <button>OK</button>
        </div>
    )
}

