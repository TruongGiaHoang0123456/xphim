import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import Button from '../../components/Button/Button';
import styles from './RegisterPage.module.scss';
import WrapComponentEmpty from '../../components/WrapComponentEmpty';
import Topic from '../../components/Topic/Topic';

let cx = classNames.bind(styles);

function RegisterPage() {
  const [errorLogin, setErrorLogin] = useState()

  // type password
  const [typePassword, setTypePassword] = useState('password')
  // type rePassword
  const [typeRePassword, setTypeRePassword] = useState('password')

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  const onSubmit = (data) => {
    async function getUser() {
      try {
        const response = await axios.post(`http://127.0.0.1:4000/users/add-account`, {
          ...data
        })

        if (response.data === 'Account already exists') {
          setErrorLogin(response.data)
        } else if (response.data === 'Create account sucess') {
          setErrorLogin(false)
          alert('Đăng ký tài khoản thành công')
          window.location.href = '/log-in'
        }

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }

  return (
    <div className={cx('register')}>
      {/* Topic */}
      <Topic content='Đăng ký' />

      {/* form-register */}
      <form onSubmit={handleSubmit(onSubmit)} className={cx('form-register')}>
        <div className={cx('wrap')}>
          <div className={cx('data')}>
            <label htmlFor='account'>Tài khoản</label>
            <input {...register('account', { required: true, minLength: 8, maxLength: 30 })} id='account' placeholder='Nhập tài khoản của bạn' />
            {errors.account && <p>Tài khoản phải có ít nhất 8 ký tự.</p>}
            {errors.account && <p>Ví dụ: abcxyzjkl.</p>}

            {errorLogin && <span>Tài khoản đã được sử dụng</span>}
          </div>

          <div className={cx('data')}>
            <label htmlFor='email'>Email</label>
            <input {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} id='email' placeholder='Nhập email của bạn' />
            {errors.email && <p>Bạn chưa nhập email.</p>}
          </div>

          <div className={cx('data')}>
            <label htmlFor='password'>Mật khẩu</label>
            <input type={typePassword} name="password" spellCheck={false} {...register('password', { required: true, minLength: 8, maxLength: 30, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/ })} id='password' placeholder='Nhập mật khẩu của bạn' />
            {errors.password && <p>Mật khẩu phải có ít nhất 8 ký tự và phải có ít nhất 1 ký tự đặc biệt, 1 ký tự in hoa, 1 ký tự xóa .</p>}
            {errors.password && <p>Ví dụ: Hung@1234.</p>}

            {typePassword === 'text' ?
              <FontAwesomeIcon style={{ color: '#fff' }} icon={faEye} onClick={() => {
                setTypePassword('password')
              }} />
              :
              <FontAwesomeIcon style={{ color: '#fff' }} icon={faEyeSlash} onClick={() => {
                setTypePassword('text')
              }} />

            }
          </div>
          <div className={cx('data')}>
            <label htmlFor='rePassword'>Nhập lại mật khẩu</label>
            <input type={typeRePassword} name="rePassword" spellCheck={false} {...register('rePassword', { required: true, validate: (value) => value === getValues("password") })} id='rePassword' placeholder='Nhập mật khẩu của bạn' />
            {errors.rePassword && <p>Mật khẩu nhập lại không khớp</p>}

            {typeRePassword === 'text' ?
              <FontAwesomeIcon icon={faEye} onClick={() => {
                setTypeRePassword('password')
              }} />
              :
              <FontAwesomeIcon icon={faEyeSlash} onClick={() => {
                setTypeRePassword('text')
              }} />

            }
          </div>

          {/* button register */}
          <WrapComponentEmpty>
            <Button content='Đăng ký' style={{ 'backgroundColor': '#37869e' }} />
          </WrapComponentEmpty>

          {/* log-in */}
          <WrapComponentEmpty>
            <div className={cx('log-in')}>
              <span>Bạn đã có tài khoản ?</span>
              <Link to='/log-in'>Đăng nhập</Link>
            </div>
          </WrapComponentEmpty>
        </div>
      </form>

      {/* read-story */}
      <WrapComponentEmpty>
        <Button content='Đọc truyện chữ' />
      </WrapComponentEmpty>
    </div >
  );
}

export default RegisterPage;
