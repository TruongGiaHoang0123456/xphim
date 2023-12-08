import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './LogInPage.module.scss';
import Button from '../../components/Button';
import LoginWithGoogle from './LogInPageItems/LoginWithGoogle'
import WrapComponentEmpty from '../../components/WrapComponentEmpty/WrapComponentEmpty';
import { login } from '../../reducer/userSlice';
import { useDispatch } from 'react-redux';

let cx = classNames.bind(styles);

function LogInPage() {
  const [errorLogin, setErrorLogin] = useState()

  // use dispatch
  const dispatch = useDispatch()

  // use navigate 
  const navigate = useNavigate()

  // type password
  const [typePassword, setTypePassword] = useState('password')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    async function getUser() {
      try {
        const response = await axios.post(`http://localhost:4000/users/log-in`, {
          ...data
        }, { withCredentials: true });

        const result = response.data
        if (result === 'Account not found!') {
          setErrorLogin(result)
        } else {
          setErrorLogin(false)
          dispatch(login(response.data))
          navigate('/')
        }

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }

  return (
    <div className={cx('login')}>

      {/* LoginWithGoogle */}
      <WrapComponentEmpty>
        <LoginWithGoogle />
      </WrapComponentEmpty>

      {/* form-login */}
      <WrapComponentEmpty>

        <form onSubmit={handleSubmit(onSubmit)} className={cx('form-login')}>
          <div className={cx('wrap-infor')}>
            <label htmlFor='account'>Tài khoản</label>
            <input  {...register('account', { required: true, minLength: 8, maxLength: 30 })} id='account' onChange={() => {
              setErrorLogin(false)
            }} placeholder='Nhập tài khoản của bạn' />
            {errors.account && <p>Tài khoản phải có ít nhất 8 ký tự.</p>}
            {errors.account && <p>Ví dụ: abcxyzjkl.</p>}
          </div>

          <div className={cx('wrap-infor')}>
            <label htmlFor='password'>Mật khẩu</label>
            <input type={typePassword} spellCheck={false} {...register('password', { required: true, minLength: 8, maxLength: 30, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/ })} id='password' onChange={() => {
              setErrorLogin(false)
            }} placeholder='Nhập mật khẩu của bạn' />
            {errors.password && <p>Mật khẩu phải có ít nhất 8 ký tự và phải có ít nhất 1 ký tự đặc biệt, 1 ký tự in hoa, 1 ký tự xóa .</p>}
            {errors.password && <p>Ví dụ: Hung@1234.</p>}
            {errorLogin && <span>Tài khoản hoặc mật khẩu không đúng!</span>}

            {typePassword === 'text' ?
              <FontAwesomeIcon icon={faEye} onClick={() => {
                setTypePassword('password')
              }} />
              :
              <FontAwesomeIcon icon={faEyeSlash} onClick={() => {
                setTypePassword('text')
              }} />

            }

          </div>

          <div className={cx('wrap-login')}>
            <input className={cx('login')} type="submit" value='Đăng nhập' />
            <Link className={cx('forget-password')} to='/forgot-password' >Quên mật khẩu</Link>
          </div>
        </form>
      </WrapComponentEmpty>

      <WrapComponentEmpty>
        <Button content='Đăng ký' to='/register' style={{ 'backgroundColor': '#369e69' }} />
      </WrapComponentEmpty>

      {/* read-story */}
      <WrapComponentEmpty>
        <Button content='Đọc truyện chữ' border={false} />
      </WrapComponentEmpty>
    </div>
  )
}

export default LogInPage;
