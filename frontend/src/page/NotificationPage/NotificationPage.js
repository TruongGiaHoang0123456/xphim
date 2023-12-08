import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './NotificationPage.module.scss';
import PostTime from '../../components/PostTime';

let cx = classNames.bind(styles);

function NotificationPage() {

  const urlsearch = new URLSearchParams(window.location.search)
  const idParam = urlsearch.get('id')
  const userIdParam = urlsearch.get('userId')



  const [data, setData] = useState()

  useEffect(() => {
    if (idParam === 'full') {

      async function getUser() {
        try {
          const response = await axios.get('http://localhost:4000/users/list-notification', {
            params: {
              userId: userIdParam
            }
          });

          setData(response.data)
        } catch (error) {
          console.error(error);
        }
      }
      getUser()
    } else {
      async function getUser() {
        try {
          const response = await axios.get('http://localhost:4000/users/notification', {
            params: {
              id: idParam
            }
          });

          setData(response.data)
        } catch (error) {
          console.error(error);
        }
      }

      getUser()
    }
  }, [])

  return (
    <div className={cx('notification')}>
      {data?.map((item) => (
        <div key={item.id} className={cx('wrap-infor')}>
          <h2 className={cx('notification-title')}>{item.title}</h2>
          <p className={cx('notification-content')}>{item.content}</p>
          <span className={cx('notification-time')}>{PostTime(item.time)}</span>
        </div>
      ))}
    </div>
  )
}

export default NotificationPage;
