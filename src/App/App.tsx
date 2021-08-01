import React from 'react';
import { Banner } from '../features/Banner';
import st from './App.module.scss';
import {NumberInput} from '../features/NumberInput/NumberIntput';

function App() {
    return (
        <div className={st.App}>
            <NumberInput/>
            <Banner/>
        </div>
    );
}

export default App;
