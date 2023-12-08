import { useState } from 'react';
import styles from './Button.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

let cx = classNames.bind(styles);

function Button({ style = { 'background': '#b73a3a' }, onClick, to, backgroundColor = true, fa, content, border = true, mini }) {
    let Component = 'button'

    const props = {
        onClick
    }

    const classes = cx('button', {
        border: border,
        mini: mini,
        'background-color': !backgroundColor
    })

    if (content === false) {
        fa === true ? content = '' : content = '???'
    }

    if (to) {
        Component = Link
        props.to = to
    }

    return (
        < Component {...props} style={style} className={classes} >
            {content && <span>{content}</span>}
            {fa && <span>{fa}</span>}
        </Component >
    )
}

export default Button