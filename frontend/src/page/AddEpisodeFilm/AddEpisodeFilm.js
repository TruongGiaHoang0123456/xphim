import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';

import styles from './AddEpisodeFilm.module.scss'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

let cx = classNames.bind(styles);

function AddEpisodeFilm() {

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

  const [filmName, setFilmName] = useState(() => {
    const queryName = new URLSearchParams(window.location.search)
    return queryName.get('filmName')
  })

  const [filmId, setFilmId] = useState(() => {
    const queryName = new URLSearchParams(window.location.search)
    return queryName.get('id')
  })

  const [filmEpisode, setFilmEpisode] = useState('')
  const [videoLink, setVideoLink] = useState('')
  const [filmSource, setFilmSource] = useState('')

  const handleAddFilm = (e) => {
    e.preventDefault()

    const request = {
      filmId,
      filmName,
      filmEpisode,
      videoLink,
      filmSource
    }

    async function getUser() {
      try {
        const response = await axios.post(`http://127.0.0.1:4000/admin/add-episode-film`, request)

        if (response.data === 'Add episode film sucessfully!') {
          alert(`Thêm tập của phim ${filmName} thành công`)
        } else if (response.data === 'Movie name has not been imported yet') {
          alert('Bạn chưa nhập tên phim')
        } else if (response.data === 'Movie episode has not been imported yet') {
          alert('Bạn chưa nhập tập phim')
        } else if (response.data === 'Movie link has not been imported yet') {
          alert('Bạn chưa nhập link phim')
        } else if (response.data === 'Movie source has not been imported yet') {
          alert('Bạn chưa nhập source phim')
        } else if (response.data === 'The source film already exists!') {
          alert('Nguồn phim đã tồn tại')
        } else if (response.data === 'The link video already exists!') {
          alert('Link phim đã tồn tại')
        }

      } catch (error) {
        console.error(error);
      }
    }
    getUser()

  }

  return (
    <div className={cx('wrap-add-film')}>
      <h2 className={cx('topic')}>Thêm phim</h2>
      <form onSubmit={handleAddFilm} className={cx('form')}>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-name'>Tên phim</label>
          <input value={filmName} onChange={(e) => {
            setFilmName(e.target.value)
          }} className={cx('input-text')} id='movie-name' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-fiom'>Tập</label>
          <input value={filmEpisode} onChange={(e) => {
            setFilmEpisode(e.target.value)
          }} className={cx('input-text')} id='movie-fiom' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='video-link'>Link video</label>
          <input value={videoLink} onChange={(e) => {
            setVideoLink(e.target.value)
          }} className={cx('input-text')} id='video-link' placeholder='...' />
        </div>

        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-source'>Nguồn phim</label>
          <input value={filmSource} onChange={(e) => {
            setFilmSource(e.target.value)
          }} className={cx('input-text')} id='movie-source' placeholder='...' />
        </div>

        <button className={cx('btn-submit')} type='submit'>Thêm phim</button>
      </form>
    </div>
  )
}

export default AddEpisodeFilm;
