import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './ListFilmPage.module.scss'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

let cx = classNames.bind(styles);

function ListFilmPage() {
  const [data, setData] = useState()

  // use selector
  const inforUsers = useSelector(state => (state.user.value))
  // console.log('inforUsers', inforUsers?.accestoken);

  // check admin
  if (!inforUsers) {
    window.location.href = '/'
  } else {
    const tokenDecode = jwtDecode(inforUsers?.accestoken)
    if (!tokenDecode.admin) {
      window.location.href = '/'
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`http://localhost:4000/films/list-film`);

        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [])
  console.log('setData', data)

  return (
    <div className={cx('list-film')}>
      <h2 className={cx('topic')}>
        danh sach phim
      </h2>

      <div className={cx('wrap-list-film')}>
        {
          data?.map(item => (
            <div key={item.id} className={cx('film-item')}>
              <div className={cx('first')}>
                <div className={cx('before')}>
                  <span>Tên phim</span>
                  <h3>{item.name}</h3>
                </div>
                <div className={cx('after')}>
                  <span>Hình ảnh phim</span>
                  <img alt='thumbnai' src={item.image} />
                </div>
              </div>

              <div className={cx('second')}>
                <div className={cx('wrap-number-episode')}>
                  <span className={cx('name')}>Số tập</span>
                  <span className={cx('number-episode')}>{item.number_episodes}</span>
                </div>
                <div className={cx('wrap-episode-new')}>
                  <span className={cx('name')}>Tập mới nhất</span>
                  <span className={cx('episode-current')}>{item.current_episode}</span>
                </div>
                <div className={cx('wrap-movie-duration')}>
                  <span className={cx('name')}>Thời lượng phim</span>
                  <span className={cx('movie-duration')}>{item.movie_duration}</span>
                </div>

                <Link to={`/admin/add-episode-film?filmName=${item.name}&id=${item.id}`} className={cx('btn-add-film')}>Thêm tập phim</Link>
              </div>

              <div className={cx('third')}>
                <div>
                  <span>Mô tả</span>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ListFilmPage;
