
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MenuUser.module.scss'
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { faArrowRightArrowLeft, faArrowRightFromBracket, faArrowsRotate, faBell, faCircleXmark, faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../../reducer/userSlice';
import { useEffect } from 'react';
import axios from 'axios';
import PostTime from '../PostTime';


let cx = classNames.bind(styles);

function MenuUser() {
    const [showMenu, setShowMenu] = useState(true)
    const [showNotification, setShowNotification] = useState(true)
    const [notification, setNotification] = useState()

    const [rerender, setRerender] = useState(true)

    // use dispatch
    const dispatch = useDispatch()

    // use navigate
    const naviagte = useNavigate()

    // selector
    const inforUser = useSelector((state) => {
        return state.user.value
    })

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get('http://localhost:4000/users/list-notification', {
                    params: {
                        userId: inforUser.id
                    }
                });

                setNotification(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getUser()
    }, [rerender])

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleShowNotification = (e) => {
        setShowNotification(!showNotification)
    }

    // handle log out
    const handleLogOut = async (e) => {
        e.preventDefault()

        dispatch(logout())
        naviagte('/')
    }

    const handleUpdateIsRead = (id) => {
        async function getUser() {
            try {
                const response = await axios.put(`http://127.0.0.1:4000/users/update-isread`, {
                    id: id
                })

                if (response.data === 'Update isread succesfully!')
                    setRerender(!rerender)
            } catch (error) {
                console.error(error);
            }
        }
        getUser()

        setShowNotification(!showNotification)
    }

    return (
        <>
            {
                showMenu
                    ?
                    (<li className={cx('navigate-item')} onClick={handleShowMenu}>
                        <Link className={cx('navigate-item-link')}>
                            <FontAwesomeIcon icon={faUserLarge} />
                        </Link>
                    </li>)
                    : (<>
                        <li className={cx('navigate-item')} style={{ 'backgroundColor': 'rgb(156, 55, 55)' }} onClick={handleShowMenu}>
                            <Link className={cx('navigate-item-link')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </Link>
                        </li>

                        <div className={cx('menu-user')}>
                            <div className={cx('user')}>
                                {
                                    inforUser.avatar === null ?
                                        <img alt='avata' src='https://i.ytimg.com/vi/idAvatar/mqdefault.jpg' />
                                        :
                                        <img alt='avata' src={inforUser.avatar} />

                                }
                                {inforUser && <span>{inforUser.name === null ? 'Name user' : inforUser.name}</span>}
                            </div>

                            <div className={cx('feature')}>
                                <Link>
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                    <span>Đồng bộ</span>
                                </Link>
                                <Link to='/user/infor'>
                                    <FontAwesomeIcon icon={faUserLarge} />
                                    <span>Thông tin</span>
                                </Link>
                                <Link to='/user/change-password'>
                                    <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                                    <span>Thay đổi mật khẩu</span>
                                </Link>
                                <Link href='/' onClick={handleLogOut}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                    <span>Đăng xuất</span>
                                </Link>
                            </div>

                        </div>
                    </>)
            }
            {
                showNotification ?
                    (<li className={cx('navigate-item')} onClick={handleShowNotification}>
                        <Link className={cx('navigate-item-link')}>
                            <FontAwesomeIcon icon={faBell} />
                        </Link>
                    </li>)
                    :
                    (<li className={cx('navigate-item')} style={{ 'backgroundColor': 'rgb(156, 55, 55)' }} onClick={handleShowNotification}>
                        <Link className={cx('navigate-item-link')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </Link>

                        <div onClick={(e) => {
                            e.stopPropagation();
                        }} className={cx('wrap-notifycation')}>
                            <div className={cx('notifycation-header')}>
                                <h2>Thông báo</h2>
                                <Link to={`/notification?id=full&userId=${inforUser.id}`}>Xem tất cả</Link>
                            </div>

                            <ul className={cx('notifycation-list')}>
                                {notification?.map(item => (
                                    <li key={item.id} className={item.is_read ? cx('notifycation-item', 'isread') : cx('notifycation-item')}>
                                        <Link onClick={() => {
                                            handleUpdateIsRead(item.id)
                                        }} to={`/notification?id=${item.id}`} className={cx('notifycation-item-link')}>
                                            <div className={cx('wrap-image')}>
                                                <img alt='img' src={item.image} />
                                            </div>

                                            <div className={cx('wrap-infor')}>
                                                <h3>{item.title}</h3>
                                                <p>{item.content}</p>
                                                <span>{PostTime(item.time)}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>)
            }
        </>
    )
}

export default MenuUser