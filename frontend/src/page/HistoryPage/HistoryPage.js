import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './HistoryPage.module.scss';
import Topic from '../../components/Topic';
import Button from '../../components/Button';
import PostTime from '../../components/PostTime';
import LoginSection from '../../components/LoginSection/LoginSection';
import { useSelector } from 'react-redux';

let cx = classNames.bind(styles);


function HistoryPage() {
  const [data, setData] = useState()

  // use selector
  const inforUsers = useSelector(state => (state.user.value))

  useEffect(() => {

    const getData = async function () {
      try {
        const response1 = axios.get(`http://127.0.0.1:4000/users/history-film`, {
          params: {
            userId: inforUsers.id
          }
        });

        const response2 = axios.delete(`http://127.0.0.1:4000/users/remote-history`, {
          data: {
            userId: inforUsers.id
          }
        });

        Promise.all([response1, response2]).then(([response1, response2]) => {
          setData(response1.data)
        })


      } catch (error) {
        console.error(error);
      }
    }
    getData()

  }, [])

  return (
    <div className={cx('history')}>

      {/* login section */}
      {inforUsers && <LoginSection />}

      {/* Topic */}
      <Topic content='Lịch sử xem' />

      <div className={`row ${cx('movie-viewing-history')}`}>
        {inforUsers ?
          (data && data.map((item, index) => (
            <div key={index} className='col l-6 m-12'>
              <div key={index} className={cx('infor-movie')}>
                <div className={cx('avata')}>
                  <img alt={item.name} src={`https://i.ytimg.com/vi/${item.image}/mqdefault.jpg`} />
                </div>
                <div className={cx('descript-movie')}>
                  <div>
                    <span className={cx('name')}>{item.name}</span>
                    <span className={cx('time')}>{PostTime(item.timeView)}</span>
                  </div>
                  <span className={cx('episode')}>Bạn đã xem tập {item.episode !== 10000 ? item.episode : 'Full'}</span>
                </div>
              </div>
            </div>
          )))
          :
          (<div className={cx('require-login')}>
            <span>Vui lòng đăng nhập để có thể xem lịch sử !</span>
            <Link to='/log-in'>Đăng nhập</Link>
          </div>)
        }
      </div>

      {/* read stories */}
      <div className={cx('read-stories')}>
        <Link to='/'>
          <Button content='Đọc truyện chữ' border={false} />
        </Link>
      </div>
    </div>
  );
}

export default HistoryPage;
