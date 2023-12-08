import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './ChangePassword.module.scss';
import WrapComponentEmpty from '../../components/WrapComponentEmpty/WrapComponentEmpty';
let cx = classNames.bind(styles);


function ChangePassword() {
  const [errorLogin, setErrorLogin] = useState()
  const [errorRePassword, setErrorRePassword] = useState()
  const [errorPassword, setErrorPassword] = useState()

  // use selector
  const userId = useSelector((state) => {
    return state.user
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    // logic error newPassword
    if (data.newPassword !== data.rePassword) {
      return setErrorRePassword(true)
    } else {
      setErrorRePassword(false)
    }

    // api
    async function getUser() {
      try {
        const response = await axios.put(`http://127.0.0.1:4000/users/change-password`, {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          userId: userId
        })

        const result = response.data

        console.log(result)

        if (result === 'Failer') {
          setErrorPassword(result)
        } else if (result === 'Success') {
          setErrorPassword(false)
          alert('Đổi mật khẩu thành công')
        }

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }

  return (
    <div className={cx('change-password')}>
      {/* change-password */}
      <WrapComponentEmpty>
        <form onSubmit={handleSubmit(onSubmit)} className={cx('form-login')}>
          <div className={cx('wrap-infor')}>
            <label htmlFor='current-password'>Mật khẩu hiện tại</label>
            <input {...register('currentPassword', { required: true })} id='current-password' placeholder='Nhập Mật khẩu hiện tại của bạn' />
            {errors.currentPassword && <p>Vui lòng nhập trường này</p>}

            {errorPassword && <span>Mật khẩu hiện tại không đúng!</span>}
          </div>

          <div className={cx('wrap-infor')}>
            <label htmlFor='new-password'>Mật khẩu mới</label>
            <input {...register('newPassword', { required: true, minLength: 8, maxLength: 30, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/ })} id='new-password' placeholder='Nhập mật khẩu mới của bạn' />
            {errors.newPassword && <p>Mật khẩu phải có ít nhất 8 ký tự và phải có ít nhất 1 ký tự đặc biệt, 1 ký tự in hoa và 1 ký tự số</p>}
          </div>

          <div className={cx('wrap-infor')}>
            <label htmlFor='re-password'>Nhập lại mật khẩu</label>
            <input {...register('rePassword', { required: true })} id='re-password' placeholder='Nhập Nhập lại mật khẩu của bạn' />
            {errors.rePassword && <p>Vui lòng nhập trường này</p>}

            {errorRePassword && <span>Mật khẩu nhập lại không khớp!</span>}
          </div>

          <div className={cx('wrap-btn-change-password')}>
            <input type="submit" value='Đổi mật khẩu' />
          </div>
        </form>
      </WrapComponentEmpty>
    </div>
  );
}

export default ChangePassword;
