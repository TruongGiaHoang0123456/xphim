import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './HomePage.module.scss';
import ReactSlick from './HomePageItems/ReactSlick'
import Topic from '../../components/Topic'
import Button from '../../components/Button';
import WrapComponentEmpty from '../../components/WrapComponentEmpty/WrapComponentEmpty';
import Paginate from '../../components/Paginate';
import { Link } from 'react-router-dom';
import LoginSection from '../../components/LoginSection/LoginSection';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

let cx = classNames.bind(styles);


function HomePage() {
  const [data, setData] = useState()

  // use selector
  const inforUsers = useSelector(state => (state.user.value))

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('http://127.0.0.1:4000/films/list-film');
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [])


  return (
    <div className={cx('wrap-home')}>

      {/* login section */}
      {inforUsers && <LoginSection />}

      {/* Topic */}
      < Topic content='Phim sex đề cử' />

      {/* react-slick */}
      < ReactSlick />

      {/* paginate */}
      {data && <Paginate itemsPerPage={30} items={data} />}
    </div >
  );
}

export default HomePage;
