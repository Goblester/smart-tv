import React from 'react';
import st from './SuccessScreen.module.scss';


export const SuccessScreen: React.FC = () => {
    return (
        <div className={st.container}>
            <h2>ЗАЯВКА <br/> ПРИНЯТА</h2>
            <p>Держите телефон под рукой. <br/> Сокро с Вами свяжется наш менеджер.</p>
        </div>
    )
}