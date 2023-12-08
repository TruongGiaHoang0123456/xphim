// import library
import axios from "axios";
import classNames from "classnames/bind";
import { useState } from "react";
import { useForm } from 'react-hook-form';

// import source code
import styles from './ForgotPasswordPageItems.module.scss'
import UpdatePassword from "./UpdatePassword";
import WrapComponentEmpty from "../../../components/WrapComponentEmpty";

const cx = classNames.bind(styles);

const DefinedEmail = ({ reSendCode }) => {

    const [showUpdatePassword, setShowUpdatePassword] = useState(false)

    // show valification error
    const [showValificationError, setShowValificationError] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // handle submit
    const onSubmit = (data) => {
        async function getUser() {
            try {
                const response = await axios.post(`http://127.0.0.1:4000/users/validate-code-forgot-password`, {
                    code: data['defined-code']
                })

                if (response.data === 'Verified successfully!') {
                    setShowValificationError(false)
                    setShowUpdatePassword(true)
                } else if (response.data === 'Verification code is incorrect!') {
                    setShowValificationError(true)
                }

            } catch (error) {
                console.error(error);
            }
        }
        getUser()
    }

    return (
        <>{showUpdatePassword === false ?
            (<form className={cx('form-defined-code')} onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('before')}>
                    <label htmlFor='defined-code' >Điền mã xác thực vào đây: </label>
                    <input {...register('defined-code', { required: true, minLength: 8, maxLength: 8 })} onChange={() => {
                        setShowValificationError(false)
                    }} spellCheck={false} id='defined-code' placeholder='Mã xác thực' />
                    {errors['defined-code'] && <p>Mã xác minh phải có 8 ký tự.</p>}

                    {showValificationError && <p>Mã xác minh không đúng !</p>}
                </div>
                <div className={cx('after')}>
                    <input className={cx('btn-defined')} type="submit" value={'Xác minh'} />
                    <div onClick={reSendCode}>Gửi lại mã xác minh</div>
                </div>
            </form>)
            :
            (
                <WrapComponentEmpty>
                    <UpdatePassword />
                </WrapComponentEmpty>
            )
        }
        </>
    )
}

export default DefinedEmail