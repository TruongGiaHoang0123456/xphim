import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import styles from './LogInPage.module.scss';
import { useState } from 'react';
import axios from 'axios';

let cx = classNames.bind(styles);

function LogInPage() {

  const navigate = useNavigate()

  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    async function login() {
      try {
        const response = await axios.post(`http://localhost:4000/admin/log-in`, {
          account: account,
          password: password,
        }, { withCredentials: true });

        if (response.data === 'not found account!') {
          alert('not found account!')
        } else if (response.data === 'Account or Password is incorrect!') {
          alert('Account or Password is incorrect!')
        } else if (response.data === 'Login secessfully!') {
          alert('sucessfully')
          navigate('/admin/list-film')


          async function checkToken() {
            try {
              const response = await axios.get(`http://localhost:4000/admin/check-token`, { withCredentials: true })
              if (response.data === 'Not found token!' || response.data === 'Token expired!') {
                alert('session has expired')
                navigate('/')
              }
            } catch (error) {
              console.error(error);
            }
          }

          setTimeout(checkToken, 20000 * 60 * 60)

        }

      } catch (error) {
        console.error(error);
      }
    }
    login()
  }

  return (
    <div className={cx('wrap-page-login')}>

      <form onSubmit={handleSubmit} className={cx('form-login')}>
        <h2 className={cx('heading')}>Đăng nhập</h2>
        <div className={cx('wrap-infor')}>
          <label htmlFor='account'>Tài khoản</label>
          <input value={account} id='account'
            onChange={(e) => {
              setAccount(e.target.value)
            }} placeholder='Nhập tài khoản của bạn'
          />
        </div>

        <div className={cx('wrap-infor')}>
          <label htmlFor='password'>Mật khẩu</label>
          <input value={password} type='password' spellCheck={false} id='password'
            onChange={(e) => {
              setPassword(e.target.value)
            }} placeholder='Nhập mật khẩu của bạn'
          />

        </div>

        <div className={cx('wrap-login')}>
          <input className={cx('login')} type="submit" value='Đăng nhập' />
          <Link className={cx('update-password')} to='admin/update-password' >Đổi mật khẩu</Link>
        </div>
      </form>
    </div>
  )
}

export default LogInPage;
