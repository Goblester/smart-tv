import React from 'react';
import { Banner } from '../features/Banner';
import { NumberInput } from '../features/NumberInput';
import st from './App.module.scss';

function App() {
    return (
        <div className={st.App}>
            <NumberInput/>
            <Banner/>
        </div>
    );
}

export default App;
