import React from 'react';
import {useSelector} from 'react-redux';
import st from './LeftPanel.module.scss';
import {AppRootStateType} from '../../App/store';
import {AppStatusType} from '../Applicaton/application-reducer';
import {selectStatus} from '../Applicaton/selectors';
import classNames from 'classnames';
import { NumberInput } from './NumberInput/NumberIntput';
import {SuccessScreen} from './SuccessScreen/SuccessScreen';

export const LeftPanel: React.FC = () => {

    const status = useSelector<AppRootStateType, AppStatusType>(selectStatus);


const containerClasses = classNames(st.container, st.show /*status === 'enter' ? st.show : st.hide*/)

return (
    <div className={containerClasses}>
        {status === 'enter'&&<NumberInput/>}
        {status === 'succeeded'&&<SuccessScreen/>}
    </div>
)
}