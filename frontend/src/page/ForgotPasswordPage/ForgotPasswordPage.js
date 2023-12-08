import { useState } from 'react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import axios from 'axios';


import Button from '../../components/Button/Button';
import styles from './ForgotPasswordPage.module.scss';
import WrapComponentEmpty from '../../components/WrapComponentEmpty';
import Topic from '../../components/Topic/Topic';
import DefinedEmail from './ForgotPasswordPageItems/DefinedEmail';

let cx = classNames.bind(styles);

function ForgotPasswordPage() {
  // show error where login
  const [errorAccount, setErrorAccount] = useState(false)

  const [data, setData] = useState()

  // show error email
  const [errorEmail, setErrorEmail] = useState(false)

  const [showDefinedPassword, setShowDefinedPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    setData(data)

    async function getUser() {
      try {
        const response = await axios.put(`http://127.0.0.1:4000/users/forgot-password`, {
          email: data.email,
          account: data.account
        })

        if (response.data === 'Not find account!') {
          setErrorAccount(true)
        } else if (response.data === 'Email does not match account!') {
          setErrorEmail(true)
        } else if (response.data === 'Account found!') {
          setErrorAccount(false)
          setErrorEmail(false)
          setShowDefinedPassword(true)
        }

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }

  return (
    <div className={cx('forgot-password')}>
      {showDefinedPassword === false ? (
        <>
          {/* Topic */}
          <Topic content='Quên mật khẩu' />

          {/* form-forgot-password */}
          <form onSubmit={handleSubmit(onSubmit)} className={cx('form-forgot-password')}>
            <div className={cx('wrap-form')}>
              <div>
                <label htmlFor='account'>Tài khoản</label>
                <input {...register('account', { required: true, minLength: 8, maxLength: 30 })} id='account' onChange={() => {
                  setErrorAccount(false)
                  setErrorEmail(false)
                }} placeholder='Nhập tài khoản của bạn' />
                {errors.account && <p>Tài khoản phải có ít nhất 8 ký tự.</p>}
                {errors.account && <p>Ví dụ: abcxyzjkl.</p>}

                {errorAccount && <p>Tài khoản không có trong hệ thống !</p>}
              </div>

              <div>
                <label htmlFor='email'>Email</label>
                <input {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} id='email' placeholder='Nhập email của bạn' />
                {errors.email && <p>Bạn chưa nhập email.</p>}

                {errorEmail && <p>Email không khớp với tài khoản!</p>}
              </div>

              <WrapComponentEmpty>
                <Button content='Tìm lại mật khẩu' />
              </WrapComponentEmpty>
            </div>
          </form>

          {/* read-story */}
          <WrapComponentEmpty>
            <Button content='Đọc truyện chữ' />
          </WrapComponentEmpty>
        </>
      )
        :
        (
          // defined email
          <WrapComponentEmpty>
            <DefinedEmail reSendCode={() => {
              onSubmit(data)
            }
            }
            />
          </WrapComponentEmpty>
        )
      }
    </div>
  );
}

export default ForgotPasswordPage;
