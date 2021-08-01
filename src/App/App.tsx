import React from 'react';
import { Banner } from '../features/Banner';
import { LeftPanel } from '../features/LeftPannel';
import st from './App.module.scss';

function App() {
    return (
        <div className={st.App}>
            <LeftPanel/>
            <Banner/>
        </div>
    );
}

export default App;
