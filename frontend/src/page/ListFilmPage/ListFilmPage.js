import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './ListFilmPage.module.scss'

let cx = classNames.bind(styles);

function ListFilmPage() {
  const [data, setData] = useState()

  const [searchValue, setSearchValue] = useState('')

  const [showUpdatefilm, setShowUpdateFilm] = useState('')

  const [reRender, setReRender] = useState(true)

  const navigate = useNavigate()

  const [imageValue, setImageValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [slugValue, setSlugValue] = useState('')
  const [genresValue, setGenresValue] = useState('')
  const [actorValue, setActorValue] = useState('')
  const [countryValue, setCountryValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [viewsValue, setViewsValue] = useState('')
  const [likesValue, setLikesValue] = useState('')
  const [unLikesValue, setUnLikesValue] = useState('')
  const [avrLikesValue, setAvrLikesValue] = useState('')
  const [server1Value, setServer1Value] = useState('')
  const [server2Value, setServer2Value] = useState('')
  const [server3Value, setserver3Value] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [sourceValue, setSourceValue] = useState('')

  useEffect(() => {

    async function checkToken() {
      try {
        const response = await axios.get(`http://localhost:4000/admin/check-token`, { withCredentials: true })
        if (response.data === 'Not found token!' || response.data === 'Token expired!') {
          navigate('/')
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkToken()

    async function getUser() {
      try {
        const response = await axios.get(`http://localhost:4000/admin/search-film`, {
          params: {
            searchValue: ''
          }
        });
        setData(response.data)

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [reRender])

  useEffect(() => {

    if (!searchValue) {
      return;
    }

    async function getUser() {
      try {
        const response = await axios.get(`http://localhost:4000/admin/search-film`, {
          params: {
            searchValue: searchValue
          }
        });
        setData(response.data)

      } catch (error) {
        console.error(error);
      }
    }

    const searchTimeout = setTimeout(getUser, 1000)

    return () => {
      clearTimeout(searchTimeout)
    }
  }, [searchValue])

  const handleDeleteFilm = (id) => {
    async function deleteFilm() {
      try {
        const response = await axios.delete(`http://localhost:4000/admin/delete-films/${id}`);

        if (response.data === 'Delete films succesfully!') {
          setReRender(!reRender)
        }

      } catch (error) {
        console.error(error);
      }
    }
    deleteFilm()
  }

  const handleUpdateFilm = (id) => {
    const data = {
      id: id,
      imageValue: imageValue,
      nameValue: nameValue,
      slugValue: slugValue,
      genresValue: genresValue,
      actorValue: actorValue,
      countryValue: countryValue,
      descriptionValue: descriptionValue,
      viewsValue: viewsValue,
      likesValue: likesValue,
      unLikesValue: unLikesValue,
      avrLikesValue: avrLikesValue,
      server1Value: server1Value,
      server2Value: server2Value,
      server3Value: server3Value,
      timeValue: timeValue,
      sourceValue: sourceValue,
    }

    async function updateFilm() {
      try {
        const response = await axios.put(`http://localhost:4000/admin/update-films`, data);

        if (response.data === 'Actor not exist!') {
          alert('Actor not exist!')
        } else if (response.data === 'Country not exist!') {
          alert('Country not exist!')
        } else if (response.data?.[0] === 'Not found genre!') {
          alert(`${response.data[0]} ${response.data[1]}`)
        } else if (response.data === 'Value must be greate than db!') {
          alert('Value must be greate than db!')
        } else if (response.data === 'Update films sucessfully!') {
          setShowUpdateFilm('')
          setReRender(!reRender)
        }

      } catch (error) {
        console.error(error);
      }
    }
    updateFilm()

    console.log('data', data);
  }

  return (
    <div className={cx('list-film')}>
      <div className={cx('wrap-heading')}>
        <h2 className={cx('topic')}>
          danh sach phim
        </h2>
        <div className={cx('wrap-search')}>
          <input value={searchValue} onChange={(e) => {
            setSearchValue(e.target.value)
          }} spellCheck={false} placeholder='Search...' />
        </div>
      </div>


      <div className={cx('wrap-list-film')}>
        {
          data?.map(item => (
            <div key={item.id} className={cx('film-item')}>
              <div className={cx('film-item-before')}>
                <div className={cx('wrap-id')}>
                  id
                  <span>{item.id}</span>
                </div>

                <div className={cx('wrap-image')}>
                  image
                  {
                    showUpdatefilm === item.id ?
                      <input value={imageValue} onChange={(e) => {
                        setImageValue(e.target.value)
                      }} />
                      :
                      <img alt={item.name} src={item.image} />
                  }
                </div>

                <div className={cx('wrap-name')}>
                  name
                  {
                    showUpdatefilm === item.id ?
                      <input value={nameValue} onChange={(e) => {
                        setNameValue(e.target.value)
                      }} />
                      :
                      <h3>{item.name}</h3>
                  }
                </div>

                <div className={cx('wrap-slug')}>
                  slug
                  {
                    showUpdatefilm === item.id ?
                      <input value={slugValue} onChange={(e) => {
                        setSlugValue(e.target.value)
                      }} />
                      :
                      <h3>{item.slug}</h3>
                  }
                </div>

                <div className={cx('wrap-genres')}>
                  genres
                  {
                    showUpdatefilm === item.id ?
                      <input value={genresValue} onChange={(e) => {
                        setGenresValue(e.target.value)
                      }} />
                      :
                      <span>{item.genres.join(',')}</span>
                  }
                </div>

                <div className={cx('wrap-actor')}>
                  actor
                  {
                    showUpdatefilm === item.id ?
                      <input value={actorValue} onChange={(e) => {
                        setActorValue(e.target.value)
                      }} />
                      :
                      <span>{item.actor}</span>
                  }
                </div>

                <div className={cx('wrap-country')}>
                  country
                  {
                    showUpdatefilm === item.id ?
                      <input value={countryValue} onChange={(e) => {
                        setCountryValue(e.target.value)
                      }} />
                      :
                      <span>{item.country}</span>
                  }
                </div>

                <div className={cx('wrap-description')}>
                  description
                  {
                    showUpdatefilm === item.id ?
                      <textarea value={descriptionValue} onChange={(e) => {
                        setDescriptionValue(e.target.value)
                      }} />
                      :
                      <p>{item.description}</p>
                  }
                </div>

                <div className={cx('wrap-views')}>
                  views
                  {
                    showUpdatefilm === item.id ?
                      <input value={viewsValue} onChange={(e) => {
                        setViewsValue(e.target.value)
                      }} />
                      :
                      <span>{item.views} views</span>
                  }
                </div>

                <div className={cx('wrap-likes')}>
                  like
                  {
                    showUpdatefilm === item.id ?
                      <input value={likesValue} onChange={(e) => {
                        setLikesValue(e.target.value)
                      }} />
                      :
                      <span>{item.likes} like</span>
                  }
                </div>

                <div className={cx('wrap-un-likes')}>
                  dislike
                  {
                    showUpdatefilm === item.id ?
                      <input value={unLikesValue} onChange={(e) => {
                        setUnLikesValue(e.target.value)
                      }} />
                      :
                      <span>{item.un_likes} dislike</span>
                  }
                </div>

                <div className={cx('wrap-avr-likes')}>
                  avg like
                  {
                    showUpdatefilm === item.id ?
                      <input value={avrLikesValue} onChange={(e) => {
                        setAvrLikesValue(e.target.value)
                      }} />
                      :
                      <span>{item.average_likes} avg</span>
                  }
                </div>

                <div className={cx('wrap-server1')}>server1
                  {
                    showUpdatefilm === item.id ?
                      <input value={server1Value} onChange={(e) => {
                        setServer1Value(e.target.value)
                      }} />
                      :
                      <span>{item.server1}</span>
                  }
                </div>

                <div className={cx('wrap-server2')}>
                  server2
                  {
                    showUpdatefilm === item.id ?
                      <input value={server2Value} onChange={(e) => {
                        setServer2Value(e.target.value)
                      }} />
                      :
                      <span>{item.server2}</span>
                  }
                </div>

                <div className={cx('wrap-server3')}>
                  server3
                  {
                    showUpdatefilm === item.id ?
                      <input value={server3Value} onChange={(e) => {
                        setserver3Value(e.target.value)
                      }} />
                      :
                      <span>{item.server3}</span>
                  }
                </div>

                <div className={cx('wrap-time')}>
                  time
                  {
                    showUpdatefilm === item.id ?
                      <input value={timeValue} onChange={(e) => {
                        setTimeValue(e.target.value)
                      }} />
                      :
                      <span>{item.time}</span>
                  }
                </div>
                <div className={cx('wrap-time')}>
                  source
                  {
                    showUpdatefilm === item.id ?
                      <input value={sourceValue} onChange={(e) => {
                        setSourceValue(e.target.value)
                      }} />
                      :
                      <span>{item.source}</span>
                  }
                </div>
              </div>

              {showUpdatefilm === item.id ?
                <div className={cx('film-item-after')}>
                  <button onClick={() => {
                    handleUpdateFilm(item.id)
                  }}>Sửa</button>
                  <button onClick={() => {
                    setShowUpdateFilm('')
                  }}>Huỷ</button>
                </div>

                :
                <div className={cx('film-item-after')}>
                  <button onClick={() => {
                    setShowUpdateFilm(item.id)
                    setImageValue(item.image)
                    setNameValue(item.name)
                    setSlugValue(item.slug)
                    setGenresValue(item.genres.join(','))
                    setActorValue(item.actor)
                    setCountryValue(item.country)
                    setDescriptionValue(item.description)
                    setViewsValue(item.views)
                    setLikesValue(item.likes)
                    setUnLikesValue(item.un_likes)
                    setAvrLikesValue(item.average_likes)
                    setServer1Value(item.server1)
                    setServer2Value(item.server2)
                    setserver3Value(item.server3)
                    setTimeValue(item.time)
                    setSourceValue(item.source)
                  }}>Sửa</button>
                  <button onClick={() => {
                    handleDeleteFilm(item.id)
                  }}>Xóa</button>
                </div>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ListFilmPage;
