import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './AddFilmPage.module.scss'
import { useNavigate } from 'react-router-dom';

let cx = classNames.bind(styles);

const AddFilmPage = () => {

  const navigate = useNavigate()

  const [dataGenres, setDataGenres] = useState()
  const [dataActors, setDataActors] = useState()
  const [dataCountrys, setDataCountrys] = useState()

  const [name, setFilm] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [selectGenre, setSelectGenre] = useState([])
  const [selectActor, setSelectActor] = useState('')
  const [selectCountry, setSelectCountry] = useState('')
  const [server1, setServer1] = useState('')
  const [server2, setServer2] = useState('')

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await axios.get(`http://localhost:4000/admin/check-token`, { withCredentials: true })
        if (response.data === 'Not found token!' || response.data === 'Token expired!') {
          console.log('res', response.data);
          navigate('/')
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkToken()

    async function getUser() {
      try {
        const response1 = axios.get(`http://localhost:4000/films/genres-film`);
        const response2 = axios.get(`http://localhost:4000/films/actors-film`);
        const response3 = axios.get(`http://localhost:4000/films/countrys-film`);

        Promise.all([response1, response2, response3]).then(([response1, response2, response3]) => {

          setDataGenres(response1.data)
          setDataActors(response2.data)
          setDataCountrys(response3.data)
        })

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [])

  const handleAddFilm = (e) => {
    e.preventDefault()
    if (
      !name ||
      !slug ||
      !description ||
      !thumbnail ||
      !selectActor ||
      !selectCountry ||
      !server1 ||
      !server2) {
      return alert('Value null')
    }

    const addFilm = async function () {
      try {
        const response = await axios.post(`http://localhost:4000/admin/add-film`, {
          name: name,
          slug: slug,
          description: description,
          thumbnail: thumbnail,
          selectGenre: selectGenre,
          selectActor: selectActor,
          selectCountry: selectCountry,
          server1: server1,
          server2: server2,
        })

        if (response.data === 'Name movie expired!') {
          alert('Name movie expired!')
        } else if (response.data === 'Slug movie expired!') {
          alert('Slug movie expired!')
        } else if (response.data === 'server1 expired!') {
          alert('server1 expired!')
        } else if (response.data === 'server2 expired!') {
          alert('server2 expired!')
        } else if (response.data === 'Add film sucessfully!') {
          navigate('/admin/list-film')
        }
      } catch (error) {
        console.error(error);
      }
    }
    addFilm()

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
          <input spellCheck={false} value={name} onChange={(e) => {
            setFilm(e.target.value)
          }} className={cx('input-text')} id='movie-name' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-name'>Slug</label>
          <input spellCheck={false} value={slug} onChange={(e) => {
            setSlug(e.target.value)
          }} className={cx('input-text')} id='movie-name' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-description'>Mô tả</label>
          <textarea spellCheck={false} value={description} onChange={(e) => {
            setDescription(e.target.value)
          }} className={cx('area-text')} id='movie-description' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-theme'>Thumbnail</label>
          <input spellCheck={false} value={thumbnail} onChange={(e) => {
            setThumbnail(e.target.value)
          }} className={cx('input-text')} id='movie-theme' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-source'>Thể loại</label>

          <div className={`row ${cx('wrap-list')}`}>
            {
              dataGenres?.map((genre) => (

                <div className={`l-2 ${cx('wrap-item')}`} key={genre.id}>
                  <input onChange={handleSelectGenre} id={genre.genre} type='checkbox' value={genre.genre} />
                  <label htmlFor={genre.genre}>{genre.genre}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-source'>Diễn viên</label>

          <div className={`row ${cx('wrap-list')}`}>
            {
              dataActors?.map((actor) => (

                <div className={`l-2 ${cx('wrap-item')}`} key={actor.id}>
                  <input checked={actor.actor === selectActor} onChange={(e) => {
                    setSelectActor(e.target.value)
                  }} id={actor.actor} type='checkbox' value={actor.actor} />
                  <label htmlFor={actor.actor}>{actor.actor}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-source'>Quốc gia</label>

          <div className={`row ${cx('wrap-list')}`}>
            {
              dataCountrys?.map((country) => (

                <div className={`l-2 ${cx('wrap-item')}`} key={country.country}>
                  <input checked={country.country === selectCountry} onChange={(e) => {
                    setSelectCountry(e.target.value)
                  }} id={country.country} type='checkbox' value={country.country} />
                  <label htmlFor={country.country}>{country.country}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-theme'>Server1</label>
          <input spellCheck={false} value={server1} onChange={(e) => {
            setServer1(e.target.value)
          }} className={cx('input-text')} id='movie-theme' placeholder='...' />
        </div>
        <div className={cx('wrap-infor')}>
          <label className={cx('label-name')} htmlFor='movie-theme'>Server2</label>
          <input spellCheck={false} value={server2} onChange={(e) => {
            setServer2(e.target.value)
          }} className={cx('input-text')} id='movie-theme' placeholder='...' />
        </div>

        <button className={cx('btn-submit')} type='submit'>Thêm phim</button>
      </form>
    </div>
  )
}

export default AddFilmPage;
