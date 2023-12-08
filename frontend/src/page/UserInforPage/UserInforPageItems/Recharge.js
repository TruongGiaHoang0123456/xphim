
import classNames from 'classnames/bind';

import styles from './UserInforPageItems.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

let cx = classNames.bind(styles);

function Recharge() {
    const [showRechargePaypal, setShowRechargePaypal] = useState(true)
    const [coinNumber, setCoinNumber] = useState(10)

    return (
        <div className={cx('wrap-recharge')}>

            {/* wrap-first */}
            <div className={cx('wrap-first')}>
                <div
                    style={showRechargePaypal ? { 'backgroundColor': '#9c3737' } : {}}
                    onClick={() => {
                        setShowRechargePaypal(true)
                    }}
                >
                    <FontAwesomeIcon icon={faPaypal} />
                    <span>Paypal/Visa</span>
                </div>

                <div
                    style={!showRechargePaypal ? { 'backgroundColor': '#9c3737' } : {}}
                    onClick={() => {
                        setShowRechargePaypal(false)
                    }}
                >
                    <FontAwesomeIcon icon={faCreditCard} />
                    <span>Thẻ cào</span>
                </div>
            </div>

            {showRechargePaypal ?
                (<>
                    {/* wrap-second */}
                    <div className={cx('wrap-second')}>
                        <FontAwesomeIcon icon={faExclamation} />
                        <p>Nạp bằng paypal/visa ít nhất là 10$, vì bên paypal thu phí cố định nên nạp 1 lúc càng nhiều sẽ càng đỡ phí so với nạp chia nhỏ</p>
                    </div>

                    {/* wrap-third */}
                    <div className={cx('wrap-third')}>
                        <div className={cx('before')}>
                            <label>Số tiền muốn nạp</label>
                            <input value={coinNumber} onChange={(e) => {
                                setCoinNumber(e.target.value)
                            }} />
                        </div>

                        <div className={cx('after')}>
                            <label>Loại tiền</label>
                            <div>USD</div>


                            <label>Số xu nhận được</label>
                            <div>2300</div>


                            <label>Số Kinh nghiệm nhận được</label>
                            <div>230</div>
                        </div>
                    </div>

                    {/* wrap-four */}
                    <div className={cx('wrap-four')}>
                        <button>Thanh toán</button>
                    </div>
                </>)
                :
                (
                    <>
                        {/* wrap-second */}
                        <div className={cx('wrap-second')}>
                            <p>Bảo trì</p>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Recharge;
