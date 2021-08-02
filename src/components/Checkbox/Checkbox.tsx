import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import st from './Checkbox.module.scss'
import classNames from 'classnames';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
    active?: boolean
}

const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
        value,
        active,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeChecked && onChangeChecked(e.currentTarget.checked);
    }

    const finalInputClassName = classNames(st.checkbox, className);
    const finalSpanClassName = classNames(st.spanClassName, spanClassName);
    const activeClassName = classNames({[st.active]: active});
    return (
        <label>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}
                value={value}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            <svg viewBox="0,0,30,30" className={activeClassName}>
                <path d="M 3 14 L 12 23 L 27 7"/>
            </svg>
            {children && <span className={finalSpanClassName}>{children}</span>}
        </label> // благодаря label нажатие на спан передастся в инпут
    )
}

export default Checkbox
