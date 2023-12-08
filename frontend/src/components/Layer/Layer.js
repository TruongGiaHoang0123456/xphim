import { useState } from 'react';
import styles from './Layer.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

let cx = classNames.bind(styles);

const Layer = ({ children }) => {

    return (
        <div className={cx('layer')}>
            {children}
        </div>
    )
}

export default Layer