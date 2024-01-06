import styles from './Logo.module.scss'
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function Logo({ fs }) {

    return (
        <div className={cx('wrap-logo')} style={{ 'fontSize': fs }} >
            <span className={cx('sex')}>Sex</span>
            <span className={cx('color')}>Color</span>
        </div>
    )
}

export default Logo