import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './FollowedPage.module.scss';
import Topic from '../../components/Topic';
import Paginate from '../../components/Paginate';
import { useSelector } from 'react-redux';
import LoginSection from '../../components/LoginSection/LoginSection';

let cx = classNames.bind(styles);

function FollowedPage() {

  const [data, setData] = useState()

  // use selector
  const inforUsers = useSelector(state => (state.user.value))

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('http://localhost:4000/users/followed-film', {
          params: {
            userId: inforUsers.id ? inforUsers.id : 0
          }
        });
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()

  }, [])

  return (
    <div className={cx('followed')}>

      {/* login section */}
      {inforUsers && <LoginSection />}

      {/* Topic */}
      <Topic content='Phim bạn theo dõi' />

      {/* WrapInforMovie */}
      {inforUsers ?
        (data && <Paginate itemsPerPage={30} items={data} />)
        :
        (<div className={cx('require-login')}>
          <span>Vui lòng đăng nhập để có thể theo dõi !</span>
          <Link to='/log-in'>Đăng nhập</Link>
        </div>)
      }
    </div>
  );
}

export default FollowedPage;
