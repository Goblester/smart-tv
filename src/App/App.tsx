import React from 'react';
import { Banner } from '../features/Banner';
import st from './App.module.scss';

function App() {
    return (
        <div className={st.App}>
            <div className={st.container}>
            </div>
            <Banner/>
        </div>
    );
}

export default App;
