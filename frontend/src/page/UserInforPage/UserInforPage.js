import classNames from 'classnames/bind';
import { useState } from 'react';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLandmark, faShop, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './UserInforPage.module.scss';
import Profile from './UserInforPageItems/Profile';
import Recharge from './UserInforPageItems/Recharge';
import Store from './UserInforPageItems/Store';
import Transaction from './UserInforPageItems/Transaction';

let cx = classNames.bind(styles);

function UserInforPage() {

  const [showProfile, setShowProfile] = useState(true)
  const [showRechargeCoin, setShowRechargeCoin] = useState(false)
  const [showTransactionHistory, setShowransactionHistory] = useState(false)
  const [showStore, setShowStore] = useState(false)

  const hadleShowCategory = (category) => {
    setShowProfile((pre) => {
      return category === 'profile'
    })
    setShowRechargeCoin((pre) => {
      return category === 'recharge'
    })
    setShowransactionHistory((pre) => {
      return category === 'transactionHistory'
    })
    setShowStore((pre) => {
      return category === 'store'
    })
  }

  return (

    <div className={cx('wrap-user-infor')}>

      {/* hello-bar */}
      <div className={cx('before')}>
        <div className={cx('first')}>
          <span className={cx('hello')}>Hello</span>
          <span className={cx('name')}>Hoàng Trương</span>
        </div>
        <div className={cx('second')}>
          <span>0</span>
          <FontAwesomeIcon icon={faBitcoin} />
        </div>
      </div>

      {/* wrap-infor */}
      <div className={cx('after')}>
        <div className={cx('wrap-category')}>
          <div
            style={showProfile ? { 'backgroundColor': '#55918c' } : {}}
            onClick={() => {
              hadleShowCategory('profile')
            }}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Hồ sơ</span>
          </div>

          <div
            style={showRechargeCoin ? { 'backgroundColor': '#55918c' } : {}}
            onClick={() => {
              hadleShowCategory('recharge')
            }}
          >
            <FontAwesomeIcon icon={faAddressCard} />
            <span>Nạp xu</span>
          </div>

          <div
            style={showTransactionHistory ? { 'backgroundColor': '#55918c' } : {}}
            onClick={() => {
              hadleShowCategory('transactionHistory')
            }}
          >
            <FontAwesomeIcon icon={faLandmark} />
            <span>Lịch sử giao dịch</span>
          </div>

          <div
            style={showStore ? { 'backgroundColor': '#55918c' } : {}}
            onClick={() => {
              hadleShowCategory('store')
            }}
          >
            <FontAwesomeIcon icon={faShop} />
            <span>Cửa hàng</span>
          </div>
        </div>

        {/* logic show component */}
        {showProfile && <Profile />}
        {showRechargeCoin && <Recharge />}
        {showTransactionHistory && <Transaction />}
        {showStore && <Store />}
      </div>
    </div>
  );
}

export default UserInforPage;
