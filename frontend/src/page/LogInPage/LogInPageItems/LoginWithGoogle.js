// import librarys
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// import source code
import styles from './LoginPageItems.module.scss'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../reducer/userSlice';

const cx = classNames.bind(styles)

const LoginWithGoogle = () => {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState(null);

    // dispatch
    const dispatch = useDispatch()

    // navigate
    const navigate = useNavigate()

    const loginGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);

                        async function getUser() {
                            try {
                                const response = await axios.post(`http://localhost:4000/users/log-in-google`, {
                                    ...res.data
                                })

                                dispatch(login(response.data))
                                navigate('/')

                            } catch (error) {
                                console.error(error);
                            }
                        }
                        getUser()
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
        },
        [user]
    );

    return (
        <div className={cx('login-with-google')} onClick={() => {
            loginGoogle()
        }}>
            {profile ?
                (
                    <div className={cx('logged')}>
                        <img src={profile.picture} alt='uer-avatar' />

                        <div className={cx('user-infor')}>
                            <div>Đăng nhập với tên {profile.name}</div>
                            <span>{profile.email}</span>
                        </div>
                        <FontAwesomeIcon icon={faGoogle} />
                    </div >
                )
                :
                (
                    <div className={cx('un-loggin')}>
                        <span >Đăng nhập với google</span>
                        <FontAwesomeIcon icon={faGoogle} />
                    </div>
                )
            }
        </div>
    )
}

export default LoginWithGoogle