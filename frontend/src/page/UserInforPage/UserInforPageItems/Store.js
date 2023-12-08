import classNames from 'classnames/bind';

import styles from './UserInforPageItems.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

let cx = classNames.bind(styles);

function Store() {

    return (
        <div className={cx('wrap-store')}>
            <div className={cx('wrap-package')}>
                <img alt='member' src='https://i.imgur.com/8HZWnBC.png' />
                <span className={cx('time')}>VIP 1 Tháng</span>
                <span className={cx('content')}>Xóa quảng cáo</span>
                <div className={cx('wrap-coin')}>
                    <span>300</span>
                    <FontAwesomeIcon icon={faBitcoin} />
                </div>
                <button>Mua</button>
            </div>
        </div>
    );
}

export default Store;
