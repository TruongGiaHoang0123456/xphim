import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './AddFilmPage.module.scss'
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

let cx = classNames.bind(styles);

const AddFilmPage = async () => {

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

  const [data, setData] = useState()

  const [filmName, setFilmName] = useState('')
  const [filmDescription, setFilmDescription] = useState('')
  const [numberEpisodes, setNumberEpisodes] = useState(null)
  const [releaseYear, setReleaseYear] = useState(null)
  const [filmThumbnail, setFilmThumbnail] = useState(null)
  const [filmPart, setFilmPart] = useState(null)
  const [selectGenre, setSelectGenre] = useState([])

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`http://localhost:4000/admin/render-page-add-film`);

        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [])

  const handleAddFilm = (e) => {
    e.preventDefault()

    const request = {
      filmName,
      filmDescription,
      numberEpisodes,
      releaseYear,
      filmThumbnail,
      filmPart,
      selectGenre
    }

    async function getUser() {
      try {
        const response = await axios.post(`http://127.0.0.1:4000/admin/add-film`, request)

        if (response.data === 'Add film sucessfully!') {
          alert('Thêm phim thành công')
        } else if (response.data === 'The movie already exists!') {
          alert('Phim đã tồn tại')
        }

      } catch (error) {
        console.error(error);
      }
    }
    getUser()

  }

  const handleSelectGenre = (e) => {
    const value = e.target.value

    if (selectGenre.includes(value)) {
      setSelectGenre((pre) => {
        const result = pre.filter((item) => (
          item !== value
        ))
        return result
      })
    } else {
      setSelectGenre(
        [
          ...selectGenre,
          value
        ]
      )
    }
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
          <label className={cx('label-name')} htmlFor='movie-description'>Mô tả</label>
          <textarea onChange={(e) => {
            setFilmDescription(e.target.value)
          }} className={cx('area-text')} id='movie-description' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='series-movie-length'>Số lượng tập</label>
          <input value={numberEpisodes} onChange={(e) => {
            setNumberEpisodes(e.target.value)
          }} className={cx('input-text')} id='series-movie-length' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-year'>Năm phát hành</label>
          <input value={releaseYear} onChange={(e) => {
            setReleaseYear(e.target.value)
          }} className={cx('input-text')} id='movie-year' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-theme'>Thumbnail</label>
          <input value={filmThumbnail} onChange={(e) => {
            setFilmThumbnail(e.target.value)
          }} className={cx('input-text')} id='movie-theme' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-part'>Phần</label>
          <input value={filmPart} onChange={(e) => {
            setFilmPart(e.target.value)
          }} className={cx('input-text')} id='movie-part' placeholder='...' />
        </div>

        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-source'>Thể loại</label>

          <div className={`row ${cx('wrap-list-genres')}`}>
            {
              data?.genresList.map((genre) => (

                <div className={`l-2 ${cx('wrap-item-genres')}`} key={genre.genre}>
                  <input onChange={handleSelectGenre} id={genre.genre} type='checkbox' value={genre.genre} />
                  <label htmlFor={genre.genre}>{genre.genre}</label>
                </div>
              ))
            }
          </div>
        </div>

        <button className={cx('btn-submit')} type='submit'>Thêm phim</button>
      </form>
    </div>
  )
}

export default AddFilmPage;
