import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './AddGenrePage.module.scss'
import { useNavigate } from 'react-router-dom';

let cx = classNames.bind(styles);

const AddGenrePage = () => {

  const navigate = useNavigate()

  const [rerender, setRerender] = useState(true)

  const [dataGenres, setDataGenres] = useState()

  // show add
  const [showAddGenre, setShowAddGenre] = useState(false)

  // show update
  const [showUpdateGenre, setShowUpdateGenre] = useState('')

  const [genre, setGenre] = useState('')

  const [valueGenreUpdate, setValueGenreUpdate] = useState('')

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
        const response1 = await axios.get(`http://localhost:4000/films/genres-film`);
        setDataGenres(response1.data)

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [rerender])

  const handleAddGenre = (e) => {
    const addGenre = async function () {
      try {
        const response = await axios.post(`http://localhost:4000/admin/add-genre`, {
          genre: genre
        })

        if (response.data === 'Invalid value!') {
          alert('Invalid value')
        } else if (response.data === 'Genre already exists!') {
          alert('Genre already exists!')
        } else if (response.data === 'Add genre sucessfully!') {
          setShowAddGenre('')
          setRerender(!rerender)
        }
      } catch (error) {
        console.error(error);
      }
    }
    addGenre()
  }

  const handleDeleteGenre = (genreId) => {
    async function deleteGenre() {
      try {
        const response = await axios.delete(`http://localhost:4000/admin/delete-genre`, {
          data: {
            genreId: genreId
          }
        });

        if (response.data === 'Delete genre succesfully!') {
          setRerender(!rerender)
        }

      } catch (error) {
        console.error(error);
      }
    }
    deleteGenre()
  }

  const handleUpdateGenre = (id) => {
    const genre = valueGenreUpdate.trim()
    if (!genre) {
      return alert('Invalid value')
    }

    async function updateGenre() {
      try {
        const response = await axios.put(`http://localhost:4000/admin/update-genre`, {
          id: id,
          genre: genre
        });

        if (response.data === 'Update genre sucessfully!') {
          setShowUpdateGenre('')
          setRerender(!rerender)
        }

      } catch (error) {
        console.error(error);
      }
    }
    updateGenre()
  }

  return (
    <div className={cx('wrap-add-infor-film')}>
      <h2 className={cx('infor-film-topic')}>Thêm thể loại</h2>

      <div className={cx('wrap-select-list')}>
        <div className={cx('wrap-select-item')}>
          <h3 className={cx('select-item-heading')}>Thể loại</h3>
          <div className={`${cx('select-item-list')}`}>
            <div className={`row ${cx('before')}`}>
              {
                dataGenres?.map((genre) => (
                  <div className={`l-4 ${cx('select-item-item')}`} key={genre.id}>
                    <span className={cx('name')}>{genre.genre}</span>
                    {showUpdateGenre === genre.genre && <div className={cx('wrap-update')}>
                      <input spellCheck={false} onChange={(e) => {
                        setValueGenreUpdate(e.target.value)
                      }} value={valueGenreUpdate} />
                      <button onClick={() => {
                        handleUpdateGenre(genre.id)
                      }} >Sửa</button>
                      <button onClick={() => {
                        setShowUpdateGenre('')
                      }}>Hủy</button>
                    </div>}
                    {showUpdateGenre !== genre.genre && <div className={cx('wrap-btn')}>
                      <button onClick={() => {
                        handleDeleteGenre(genre.id)
                      }} className={cx('btn-delete')}>Xóa</button>
                      <button onClick={() => {
                        setValueGenreUpdate(genre.genre)
                        setShowUpdateGenre(genre.genre)
                      }} className={cx('btn-update')}>Sửa</button>
                    </div>}
                  </div>
                ))
              }
            </div>
            <div className={cx('after')}>
              {
                showAddGenre ?
                  <div className={cx('wrap-add-btn')}>
                    <input spellCheck={false} onChange={(e) => {
                      setGenre(e.target.value)
                    }} value={genre} />
                    <button onClick={handleAddGenre} >Thêm</button>
                    <button onClick={() => {
                      setShowAddGenre(false)
                    }}>Hủy</button>
                  </div>
                  :
                  <button onClick={() => {
                    setShowAddGenre(true)
                  }} className={cx('btn-show-add')}>Thêm thể loại</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGenrePage;
