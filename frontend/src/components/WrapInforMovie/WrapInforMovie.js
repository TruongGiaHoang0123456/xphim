import styles from './WrapInforMovie.module.scss'
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function WrapInforMovie({ children }) {
    return (
        <div className={cx('wrap-informovie')}>
            {children}
        </div>
    )
}

export default WrapInforMovie