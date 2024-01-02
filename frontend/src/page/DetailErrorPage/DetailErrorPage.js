import classNames from 'classnames/bind';

import styles from './DetailErrorPage.module.scss'
import Topic from '../../components/Topic/Topic';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

let cx = classNames.bind(styles);

const DetailErrorPage = () => {

  const idParams = useParams().id

  const navigate = useNavigate()

  const [data, setData] = useState()

  useEffect(() => {

    async function getError() {
      try {
        const response = axios.get(`http://127.0.0.1:4000/admin/detail-error/${idParams}`)
        const response2 = axios.put(`http://127.0.0.1:4000/admin/update-isread-error/${idParams}`)

        Promise.all([response, response2]).then(([response, response2]) => {
          setData(response.data)
        })

      } catch (error) {
        console.error(error);
      }
    }
    getError()
  }, [idParams])

  const handleDeleteNotify = (id) => {
    async function deleteNotifyError() {
      try {
        const response = await axios.delete(`http://localhost:4000/admin/delete-notify-error/${id}`);

        if (response.data === 'Delete notify error succesfully!') {
          navigate('/admin/all-error')
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

      <div className={cx('wrap-error')}>
        <div className={cx('notify-wrap-error')}>
          <span className={cx('topic')}>Server:</span>
          <span
            className={cx('content')}
          >{data?.server}
          </span>
        </div>
        <div className={cx('notify-wrap-desc')}>
          <span>Mô tả:</span>
          <p>{data?.description}</p>
        </div>
        <div className={cx('notify-wrap-error', 'notify-wrap-link')}>
          <span className={cx('topic')}>Slug: </span>
          <Link to={`/watch-movie/${data?.slug}`} className={cx('content')}>{data?.slug}</Link>
        </div>
        <div className={cx('notify-wrap-error', 'notify-wrap-time')}>
          <span className={cx('topic')}>Thời gian: </span>
          <span className={cx('content')}>{data?.time}</span>
        </div>
        <div onClick={() => {
          handleDeleteNotify(data?.id)
        }} className={cx('notify-wrap-close')}>
          <FontAwesomeIcon icon={faClose} />
        </div>
      </div>
    </div>
  )
}

export default DetailErrorPage;
