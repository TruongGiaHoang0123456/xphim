// import library
import { useState } from 'react';
import axios from 'axios';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { useForm } from 'react-hook-form';

// import source code
import styles from './ForgotPasswordPageItems.module.scss'
import WrapComponentEmpty from '../../../components/WrapComponentEmpty';

const cx = classNames.bind(styles);

const UpdatePassword = () => {

    const [showUpdatePassword, setShowUpdatePassword] = useState(true)

    // show valification error
    const [errorAccount, setErrorAccount] = useState(false)

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

    // handle submit
    const onSubmit = (data) => {
        async function getUser() {
            try {
                const response = await axios.put(`http://127.0.0.1:4000/users/update-password-forgot-password`, {
                    account: data.account,
                    password: data.password
                })

                if (response.data === 'Account not found!') {
                    setErrorAccount(true)
                } else if (response.data === 'Password changed successfully!') {
                    setErrorAccount(false)
                    window.location.href = '/log-in'
                }

            } catch (error) {
                console.error(error);
            }
        }
        getUser()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cx('form-update-password')}>
            <div>
                <label htmlFor='account'>Tài khoản</label>
                <input {...register('account', { required: true })} spellCheck={false} id='account' onChange={() => {
                    setErrorAccount(false)
                }} placeholder='Tài khoản' />
                {errors.account && <p>Tài khoản không được để trống</p>}

                {errorAccount && <span>Tài khoản không tồn tại</span>}
            </div>

            <div>
                <label htmlFor='password'>Mật khẩu mới</label>
                <input type={typePassword} name="password" spellCheck={false} {...register('password', { required: true, minLength: 8, maxLength: 30, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/ })} id='password' placeholder='Mật khẩu mới' />
                {errors.password && <p>Mật khẩu mới phải có ít nhất 8 ký tự và phải có ít nhất 1 ký tự đặc biệt, 1 ký tự in hoa, 1 ký tự xóa .</p>}
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
            <div>
                <label htmlFor='rePassword'>Nhập lại mật khẩu mới</label>
                <input type={typeRePassword} name="rePassword" spellCheck={false} {...register('rePassword', { required: true, validate: (value) => value === getValues("password") })} id='rePassword' placeholder='Nhập lại mật khẩu mới mới' />
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

            <WrapComponentEmpty>
                <input className={cx('btn-update')} type="submit" value={'Đổi mật khẩu mới'} />
            </WrapComponentEmpty>
        </form>
    )
}

export default UpdatePassword