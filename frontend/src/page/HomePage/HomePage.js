import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './HomePage.module.scss';
import ReactSlick from './HomePageItems/ReactSlick'
import Topic from '../../components/Topic/Topic'
import Paginate from '../../components/Paginate/Paginate';
import BottmBody from '../../components/BottmBody/BottmBody';

let cx = classNames.bind(styles);


function HomePage() {
  const [data, setData] = useState()

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

      {/* Topic */}
      <div className={cx('wrap-topic')}>
        < Topic content='Phim sex đề cử' />
      </div>

      {/* react-slick */}
      < ReactSlick />

      {/* paginate */}
      {data && <Paginate itemsPerPage={30} items={data} />}

      {/* bottom body */}
      <div className={cx('wrap-bottom-body')}>
        <BottmBody />
      </div>
    </div >
  );
}

export default HomePage;
