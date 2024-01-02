import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './AddActorPage.module.scss'
import { useNavigate } from 'react-router-dom';

let cx = classNames.bind(styles);

const AddActorPage = () => {

  const navigate = useNavigate()

  const [rerender, setRerender] = useState(true)
  const [dataActors, setDataActors] = useState()

  // show add
  const [showAddActor, setShowAddActor] = useState(false)

  // show update
  const [showUpdateActor, setShowUpdateActor] = useState('')

  const [actor, setActor] = useState('')

  const [valueActorUpdate, setValueActorUpdate] = useState('')

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
        const response = await axios.get(`http://localhost:4000/films/actors-film`);

        setDataActors(response.data)

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [rerender])

  const handleAddActor = (e) => {
    const addActor = async function () {
      try {
        const response = await axios.post(`http://localhost:4000/admin/add-actor`, {
          actor: actor
        })

        if (response.data === 'Invalid value!') {
          alert('Invalid value')
        } else if (response.data === 'Actor already exists!') {
          alert('Actor already exists!')
        } else if (response.data === 'Add actor sucessfully!') {
          setShowAddActor('')
          setRerender(!rerender)
        }
      } catch (error) {
        console.error(error);
      }
    }
    addActor()
  }

  const handleDeleteActor = (actorId) => {
    async function deleteGenre() {
      try {
        const response = await axios.delete(`http://localhost:4000/admin/delete-actor`, {
          data: {
            actorId: actorId
          }
        });

        if (response.data === 'Delete actor succesfully!') {
          setRerender(!rerender)
        }

      } catch (error) {
        console.error(error);
      }
    }
    deleteGenre()
  }

  const handleUpdateActor = (id) => {
    const actor = valueActorUpdate.trim()
    if (!actor) {
      return alert('Invalid value')
    }

    async function updateActor() {
      try {
        const response = await axios.put(`http://localhost:4000/admin/update-actor`, {
          id: id,
          actor: actor
        });

        if (response.data === 'Update actor sucessfully!') {
          setShowUpdateActor('')
          setRerender(!rerender)
        }

      } catch (error) {
        console.error(error);
      }
    }
    updateActor()
  }

  return (
    <div className={cx('wrap-add-infor-film')}>
      <h2 className={cx('infor-film-topic')}>Thêm diễn viên</h2>

      <div className={cx('wrap-select-list')}>
        <div className={cx('wrap-select-item')}>
          <h3 className={cx('select-item-heading')}>Diễn viên</h3>
          <div className={`${cx('select-item-list')}`}>
            <div className={`row ${cx('before')}`}>
              {
                dataActors?.map((actor) => (
                  <div className={`l-4 ${cx('select-item-item')}`} key={actor.id}>
                    <span className={cx('name')}>{actor.actor}</span>
                    {showUpdateActor === actor.actor && (<div className={cx('wrap-update')}>
                      <input spellCheck={false} onChange={(e) => {
                        setValueActorUpdate(e.target.value)
                      }} value={valueActorUpdate} />
                      <button onClick={() => {
                        handleUpdateActor(actor.id)
                      }} >Sửa</button>
                      <button onClick={() => {
                        setShowUpdateActor('')
                      }}>Hủy</button>
                    </div>)}
                    {showUpdateActor !== actor.actor && <div className={cx('wrap-btn')}>
                      <button onClick={() => {
                        handleDeleteActor(actor.id)
                      }} className={cx('btn-delete')}>Xóa</button>
                      <button onClick={() => {
                        setValueActorUpdate(actor.actor)
                        setShowUpdateActor(actor.actor)
                      }} className={cx('btn-update')}>Sửa</button>
                    </div>}
                  </div>
                ))
              }
            </div>
            <div className={cx('after')}>
              {
                showAddActor ?
                  <div className={cx('wrap-add-btn')}>
                    <input spellCheck={false} onChange={(e) => {
                      setActor(e.target.value)
                    }} value={actor} />
                    <button onClick={handleAddActor} >Thêm</button>
                    <button onClick={() => {
                      setShowAddActor(false)
                    }}>Hủy</button>
                  </div>
                  :
                  <button onClick={() => {
                    setShowAddActor(true)
                  }} className={cx('btn-show-add')}>Thêm diễn viên</button>
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddActorPage;
