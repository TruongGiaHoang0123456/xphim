import classNames from 'classnames/bind';

import styles from './AllErrorPage.module.scss'
import Topic from '../../components/Topic/Topic';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

let cx = classNames.bind(styles);

const AllErrorPage = () => {

  const idParams = useParams().id

  const [rerender, setRerender] = useState(false)

  const [data, setData] = useState()

  useEffect(() => {

    async function getError() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/admin/all-error`)

        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getError()
  }, [idParams, rerender])

  const handleDeleteNotify = (id) => {
    async function deleteNotifyError() {
      try {
        const response = await axios.delete(`http://localhost:4000/admin/delete-notify-error/${id}`);

        if (response.data === 'Delete notify error succesfully!') {
          setRerender(!rerender)
        }

      } catch (error) {
        console.error(error);
      }
    }
    deleteNotifyError()
  }

  return (
    <div className={cx('wrap-detail-error')}>
      <Topic mw0 content='Chi tiêt lỗi' />

      <div className={cx('wrap-error-list')}>
        {
          data?.map(item => (
            <div key={item.id} className={cx('wrap-error-item')}>
              <div className={cx('notify-wrap-error')}>
                <span className={cx('topic')}>Trạng thái:</span>
                <span
                  className={cx('content')}
                >
                  {item.is_read === 0 ? 'Chưa đọc' : 'Đã đọc'}
                </span>
              </div>
              <div className={cx('notify-wrap-error')}>
                <span className={cx('topic')}>Server:</span>
                <span
                  className={cx('content')}
                >{item.server}
                </span>
              </div>
              <div className={cx('notify-wrap-desc')}>
                <span>Mô tả:</span>
                <p>{item.description}</p>
              </div>
              <div className={cx('notify-wrap-error', 'notify-wrap-link')}>
                <span className={cx('topic')}>Slug: </span>
                <Link to={`/watch-movie/${item.slug}`} className={cx('content')}>{item.slug}</Link>
              </div>
              <div className={cx('notify-wrap-error', 'notify-wrap-time')}>
                <span className={cx('topic')}>Thời gian: </span>
                <span className={cx('content')}>{item.time}</span>
              </div>
              <div onClick={() => {
                handleDeleteNotify(item?.id)
              }} className={cx('notify-wrap-close')}>
                <FontAwesomeIcon icon={faClose} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllErrorPage;
