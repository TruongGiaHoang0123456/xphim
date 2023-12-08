import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

import styles from './UserInforPageItems.module.scss';
import { useState } from 'react';

let cx = classNames.bind(styles);

function Transaction() {
    const [historyRecharge, setHistoryRecharge] = useState(true)
    const [historyBuy, setHistoryBuy] = useState(false)

    return (
        <div className={cx('wrap-transaction')}>

            {/* wrap-first */}
            <div className={cx('wrap-first')}>
                <div style={historyRecharge ? { 'backgroundColor': '#9c3737' } : {}}
                    onClick={() => {
                        setHistoryRecharge(true)
                        setHistoryBuy(false)
                    }}
                >
                    <FontAwesomeIcon icon={faCheckDouble} />
                    <span>Lịch sử nạp</span>
                </div>

                <div style={historyBuy ? { 'backgroundColor': '#9c3737' } : {}}
                    onClick={() => {
                        setHistoryRecharge(false)
                        setHistoryBuy(true)
                    }}
                >
                    <FontAwesomeIcon icon={faCheckDouble} />
                    <span>Lịch sử mua</span>
                </div>
            </div>

            {/* wrap-second */}
            <div className={cx('wrap-second')}>
                {historyRecharge &&
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">MÃ GIAO DỊCH</th>
                                <th scope="col">SỐ TIỀN</th>
                                <th scope="col">TIỀN TỆ</th>
                                <th scope="col">NGÀY GIAO DỊCH</th>
                                <th scope="col">TRẠNG THÁI</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>20tr</td>
                                <td>vnd</td>
                                <td>9/23/2023</td>
                                <td>demo</td>
                            </tr>
                        </tbody>
                    </table>
                }

                {historyBuy &&
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">MÃ GIAO DỊCH</th>
                                <th scope="col">SỐ XU TRẢ</th>
                                <th scope="col">NGÀY GIAO DỊCH</th>
                                <th scope="col">TÊN MẶT HÀNG</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>30</td>
                                <td>9/23/2023</td>
                                <td>VIP1</td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default Transaction;
