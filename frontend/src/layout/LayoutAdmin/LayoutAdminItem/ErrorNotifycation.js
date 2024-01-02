import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { memo, useEffect, useState } from 'react';
import styles from './LayoutAdminItem.module.scss'
import axios from 'axios';

let cx = classNames.bind(styles);


const ErrorNotifycation = ({ paramId }) => {

    // error
    const [showError, setShowError] = useState(false)
    const [errorResponse, setErrorResponse] = useState()
    const [countErrorUnread, setCountErrorUnread] = useState(null)

    useEffect(() => {

        async function getError() {
            try {
                const response = await axios.get(`http://127.0.0.1:4000/admin/get-error`, {
                    params: {
                        limit: 16
                    }
                })

                const count = response.data.filter((item) => (
                    item.is_read === 0
                ))

                setCountErrorUnread(count.length)

                setErrorResponse(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getError()
    }, [paramId])

    return (
        <div className={cx('header-wrap-notify')}>
            <div onClick={() => {
                setShowError(!showError)
            }} className={cx('wrap-icon')}>
                <FontAwesomeIcon icon={faBell} />
                <span>{countErrorUnread !== null && countErrorUnread}</span>
            </div>

            {showError && <div className={cx('header-show-notify')}>
                <h3 className={cx('notify-heading')}>Thông báo</h3>
                <ul className={cx('notify-list')}>
                    {
                        errorResponse?.map(error => (
                            <li style={error.is_read === 1 ? { 'color': '#999' } : { 'color': '#eee' }}

                                key={error.id} className={cx('notify-item')}>
                                <Link to={`/admin/detail-error/${error.id}`} className={cx('notify-link')}>
                                    <div className={cx('notify-wrap-error')}>
                                        <span className={cx('topic')}>Lỗi:</span>
                                        <span
                                            className={cx('content')}
                                        >
                                            {error.server}
                                        </span>
                                    </div>
                                    <div className={cx('notify-wrap-desc')}>
                                        <span>Mô tả:</span>
                                        <p>{error.description}</p>
                                    </div>
                                    <span className={cx('notify-time')}>12/21/2021</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <Link to='/admin/all-error' className={cx('btn-view-all')}>Xem tất cả</Link>
            </div>}

        </div>
    )
}

export default memo(ErrorNotifycation)