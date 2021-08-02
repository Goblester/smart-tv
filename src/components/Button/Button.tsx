import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import st from './Button.module.scss'
import classNames from 'classnames';

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    active?: boolean
}

const Button: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        active,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    const finalClassName = classNames(st.default, {
        [st.disabled]: restProps.disabled,
        [st.active]: active
    }, className)

    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default Button
