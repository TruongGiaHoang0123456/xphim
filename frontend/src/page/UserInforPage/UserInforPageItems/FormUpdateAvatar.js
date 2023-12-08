import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import styles from './UserInforPageItems.module.scss';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLogin } from '../../../reducer/userSlice';

let cx = classNames.bind(styles);

const FormUpdateAvatar = ({ setShowFormUpdateAvatar }) => {
    // use dispatch
    const dispatch = useDispatch()

    // use selector
    const userId = useSelector((state) => {
        return state.user.value.id
    })

    // data image form
    const [image, setImage] = useState(false)

    // show image
    const [showImage, setShowImage] = useState(false)

    // show error select image
    const [showErrorSelectImage, setShowErrorSelectImage] = useState(false)

    const inputRef = useRef()

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(image)
        }
    }, [image])

    // upload file
    const handleUploadFile = (e) => {
        e.preventDefault()

        const getData = async function () {
            if (!image) {
                return setShowErrorSelectImage(true)
            }

            try {
                const formData = new FormData()
                formData.append('uploaded_file', image)
                formData.append('userId', userId)

                const response = await axios.post(`http://localhost:4000/users/profile`, formData)

                const { notify, avatar } = response.data
                if (notify === 'Update file Sucessfully!') {
                    setShowErrorSelectImage(false)
                    setShowFormUpdateAvatar(false)
                    dispatch(updateLogin({
                        nameUpdate: 'avatar',
                        valueUpdate: avatar
                    }))
                }

            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }

    // handle select file
    const handleSelectFile = (e) => {
        setShowImage(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

    return (
        <div className={cx('form-update-avatar')}>
            <div className={cx('first')}>
                <span>Tải lên ảnh đại diện</span>
                <FontAwesomeIcon icon={faXmark} onClick={() => {
                    setShowFormUpdateAvatar(false)
                }} />
            </div>

            <div className={cx('wrap-form-submit')}>
                {showImage && (
                    <div className={cx('avatar')}>
                        <img src={showImage} alt='avatar' />
                    </div>
                )}

                <form onSubmit={handleUploadFile} className={cx('form-submit')} >
                    <input ref={inputRef} type="file" onChange={handleSelectFile} className={cx('input-file')} />
                    {
                        showErrorSelectImage && (
                            <span className={cx('error-non-select')}>Bạn chưa chọn ảnh !</span>
                        )
                    }
                    <div className={cx('wrap-status')}>
                        <input type="submit" value="Update ảnh" />
                        <span onClick={() => {
                            inputRef.current.value = ''
                            setImage(false)
                            setShowImage(false)
                        }} >Hủy</span>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default FormUpdateAvatar