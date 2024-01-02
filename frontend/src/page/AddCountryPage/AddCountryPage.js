import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './AddCountryPage.module.scss'
import { useNavigate } from 'react-router-dom';

let cx = classNames.bind(styles);

const AddCountryPage = () => {

  const navigate = useNavigate()

  const [rerender, setRerender] = useState(true)

  const [dataCountrys, setDataCountrys] = useState()

  // show add
  const [showAddCountry, setShowAddCountry] = useState(false)

  // show update
  const [showUpdateCountry, setShowUpdateCountry] = useState('')

  const [country, setCountry] = useState('')

  const [valueCountryUpdate, setValueCountryUpdate] = useState('')

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
        const response = await axios.get(`http://localhost:4000/films/countrys-film`);
        setDataCountrys(response.data)

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [rerender])

  const handleAddCountry = (e) => {
    const addCountry = async function () {
      try {
        const response = await axios.post(`http://localhost:4000/admin/add-country`, {
          country: country
        })

        if (response.data === 'Invalid value!') {
          alert('Invalid value')
        } else if (response.data === 'Country already exists!') {
          alert('Country already exists!')
        } else if (response.data === 'Add country sucessfully!') {
          setShowAddCountry('')
          setRerender(!rerender)
        }
      } catch (error) {
        console.error(error);
      }
    }
    addCountry()
  }

  const handleDeleteCountry = (countryId) => {
    async function deleteGenre() {
      try {
        const response = await axios.delete(`http://localhost:4000/admin/delete-country`, {
          data: {
            countryId: countryId
          }
        });

        if (response.data === 'Delete country succesfully!') {
          setRerender(!rerender)
        }

      } catch (error) {
        console.error(error);
      }
    }
    deleteGenre()
  }

  const handleUpdateCountry = (id) => {
    const country = valueCountryUpdate.trim()
    if (!country) {
      return alert('Invalid value')
    }

    async function updateCountry() {
      try {
        const response = await axios.put(`http://localhost:4000/admin/update-country`, {
          id: id,
          country: country
        });

        if (response.data === 'Update country sucessfully!') {
          setShowUpdateCountry('')
          setRerender(!rerender)
        }

      } catch (error) {
        console.error(error);
      }
    }
    updateCountry()
  }

  return (
    <div className={cx('wrap-add-infor-film')}>
      <h2 className={cx('infor-film-topic')}>Thêm quốc gia</h2>

      <div className={cx('wrap-select-list')}>

        <div className={cx('wrap-select-item')}>
          <h3 className={cx('select-item-heading')}>Quốc gia</h3>
          <div className={`${cx('select-item-list')}`}>
            <div className={`row ${cx('before')}`}>
              {
                dataCountrys?.map((country) => (
                  <div className={`l-4 ${cx('select-item-item')}`} key={country.country}>
                    <span className={cx('name')}>{country.country}</span>
                    {showUpdateCountry === country.country && (<div className={cx('wrap-update')}>
                      <input spellCheck={false} onChange={(e) => {
                        setValueCountryUpdate(e.target.value)
                      }} value={valueCountryUpdate} />
                      <button onClick={() => {
                        handleUpdateCountry(country.id)
                      }} >Sửa</button>
                      <button onClick={() => {
                        setShowUpdateCountry('')
                      }}>Hủy</button>
                    </div>)}
                    {showUpdateCountry !== country.country && <div className={cx('wrap-btn')}>
                      <button onClick={() => {
                        handleDeleteCountry(country.id)
                      }} className={cx('btn-delete')}>Xóa</button>
                      <button onClick={() => {
                        setValueCountryUpdate(country.country)
                        setShowUpdateCountry(country.country)
                      }} className={cx('btn-update')}>Sửa</button>
                    </div>}
                  </div>
                ))
              }
            </div>
            <div className={cx('after')}>
              {
                showAddCountry ?
                  <div className={cx('wrap-add-btn')}>
                    <input spellCheck={false} onChange={(e) => {
                      setCountry(e.target.value)
                    }} value={country} />
                    <button onClick={handleAddCountry} >Thêm</button>
                    <button onClick={() => {
                      setShowAddCountry(false)
                    }}>Hủy</button>
                  </div>
                  :
                  <button onClick={() => {
                    setShowAddCountry(true)
                  }} className={cx('btn-show-add')}>Thêm quốc gia</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCountryPage;
