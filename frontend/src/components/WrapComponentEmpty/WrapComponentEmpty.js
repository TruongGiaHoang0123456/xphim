import styles from './WrapComponentEmpty.module.scss'
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function WrapComponentEmpty({ children }) {
    return (
        <div className={cx('wrap-component-empty')}>
            {children}
        </div>
    )
}

export default WrapComponentEmpty