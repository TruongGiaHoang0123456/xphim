import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import styles from './UpdatePasswordPage.module.scss';
import { useState } from 'react';
import axios from 'axios';

let cx = classNames.bind(styles);

function UpdatePasswordPage() {

  const navigate = useNavigate()

  const [account, setAccount] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newPassword !== reNewPassword) {
      return alert('Nhập lại mật khẩu không khớp')
    }

    async function login() {
      try {
        const response = await axios.put(`http://localhost:4000/admin/update-password`, {
          account: account,
          currentPassword: currentPassword,
          newPassword: newPassword
        }, { withCredentials: true });

        if (response.data === 'Not found account!') {
          alert('Not found account!')
        } else if (response.data === 'Account or Password is incorrect!') {
          alert('Account or Password is incorrect!')
        } else if (response.data === 'update password sucessfully!') {
          alert('sucessfully')
          navigate('/admin/log-in')
        }

      } catch (error) {
        console.error(error);
      }
    }
    login()
  }

  return (
    <div className={cx('wrap-page-update-password')}>

      <form onSubmit={handleSubmit} className={cx('form-update-password')}>
        <h2 className={cx('heading')}>Đổi mật khẩu</h2>
        <div className={cx('wrap-infor')}>
          <label htmlFor='account'>Tài khoản</label>
          <input value={account} id='account'
            onChange={(e) => {
              setAccount(e.target.value)
            }} placeholder='Nhập tài khoản của bạn'
          />
        </div>

        <div className={cx('wrap-infor')}>
          <label htmlFor='currentPassword'>Mật khẩu hiện tại</label>
          <input value={currentPassword} type='password' spellCheck={false} id='currentPassword'
            onChange={(e) => {
              setCurrentPassword(e.target.value)
            }} placeholder='Mật khẩu hiện tại'
          />
        </div>

        <div className={cx('wrap-infor')}>
          <label htmlFor='password'>Mật khẩu mới</label>
          <input value={newPassword} type='password' spellCheck={false} id='newPassword'
            onChange={(e) => {
              setNewPassword(e.target.value)
            }} placeholder='Nhập mật khẩu mới'
          />
        </div>

        <div className={cx('wrap-infor')}>
          <label htmlFor='reNewPassword'>Nhập lại mật khẩu mới</label>
          <input value={reNewPassword} type='password' spellCheck={false} id='reNewPassword'
            onChange={(e) => {
              setReNewPassword(e.target.value)
            }} placeholder='Nhập lại mật khẩu mới'
          />
        </div>

        <div className={cx('wrap-update-passwork')}>
          <input className={cx('update-passwork')} type="submit" value='Đổi mật khẩu' />
        </div>
      </form>
    </div>
  )
}

export default UpdatePasswordPage;
