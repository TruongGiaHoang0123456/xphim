import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';

import styles from './LayoutAdmin.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faFilm, faFolderClosed, faGauge, faGenderless, faInfoCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ErrorNotifycation from './LayoutAdminItem/ErrorNotifycation'

let cx = classNames.bind(styles);

function LayoutAdmin({ children }) {

    const [showMenuFilm, setShowMenuFilm] = useState(false)

    const paramId = useParams().id

    return (
        <div className={cx('layout-admin')}>
            <div className={cx('header')}>
                <Link className={cx('wrap-logo')} to='/'>
                    <img alt='logo' className={cx('logo')} src='/logo.png' />
                </Link>
                {/* notifycation */}
                <ErrorNotifycation paramId={paramId} />
            </div>
            <div className='row'>
                <div className=' l-2 t-2 m-2'>
                    <div className={cx('side-bar')}>

                        <h2 className={cx('title')}>Quản lý thành phần website</h2>

                        <div className={cx('wrap-category')}>
                            <div className={cx('category')}>
                                <div className={cx('first')}>
                                    <div className={cx('before')}>
                                        <FontAwesomeIcon className={cx('icon-category')} icon={faGauge} />
                                        <span className={cx('name-category')}>Dashboard</span>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('category')}>
                                <div className={cx('first')}>
                                    <div className={cx('before')}>
                                        <FontAwesomeIcon className={cx('icon-category')} icon={faInfoCircle} />
                                        <span className={cx('name-category')}>Thông tin website</span>
                                    </div>
                                </div>
                            </div>

                            <Link to='/admin/list-film' className={cx('category')}>
                                <div className={cx('first')}>
                                    <div className={cx('before')}>
                                        <FontAwesomeIcon className={cx('icon-category')} icon={faFolderClosed} />
                                        <span className={cx('name-category')}>Danh mục phim</span>
                                    </div>
                                </div>
                            </Link>

                            <div className={cx('category')}>
                                <div className={cx('first')}>
                                    <Link to='/filter-movie' className={cx('before')}>
                                        <FontAwesomeIcon className={cx('icon-category')} icon={faGenderless} />
                                        <span className={cx('name-category')}>Thể loại phim</span>
                                    </Link>
                                </div>
                            </div>

                            <div className={cx('category')}>
                                <div onClick={() => {
                                    setShowMenuFilm(!showMenuFilm)
                                }} style={showMenuFilm ? { 'background': 'red' } : { 'background': '#140c25' }} className={cx('first')}>
                                    <div className={cx('before')}>
                                        <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                                        <span className={cx('name-category')}>Phim</span>
                                    </div>

                                    <div className={cx('after')}>
                                        {
                                            showMenuFilm ?
                                                <FontAwesomeIcon className={cx('icon-left')} icon={faAngleDown} />
                                                :
                                                <FontAwesomeIcon className={cx('icon-left')} icon={faAngleLeft} />
                                        }
                                    </div>
                                </div>

                                {
                                    showMenuFilm && <div className={cx('second')}>

                                        <Link to='/admin/add-film' className={cx('before')}>
                                            <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                                            <span className={cx('name-category')}>Thêm phim</span>
                                        </Link>

                                        <Link to='/admin/add-genre' className={cx('before')}>
                                            <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                                            <span className={cx('name-category')}>Thêm thể loại</span>
                                        </Link>

                                        <Link to='/admin/add-actor' className={cx('before')}>
                                            <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                                            <span className={cx('name-category')}>Thêm diễn viên</span>
                                        </Link>

                                        <Link to='/admin/add-country' className={cx('before')}>
                                            <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                                            <span className={cx('name-category')}>Thêm quốc gia</span>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className={cx('category')}>
                            <div className={cx('first')}>
                                <div className={cx('before')}>
                                    <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                                    <span className={cx('name-category')}>Link phim</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx('category')}>
                            <div className={cx('first')}>
                                <div className={cx('before')}>
                                    <FontAwesomeIcon className={cx('icon-category')} icon={faUsers} />
                                    <span className={cx('name-category')}>User truy cập</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx('category')}>
                            <div className={cx('first')}>
                                <div className={cx('before')}>
                                    <FontAwesomeIcon className={cx('icon-category')} icon={faUsers} />
                                    <span className={cx('name-category')}>Thống kê tất cả</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='l-10 t-10 m-10'>
                    <div className={cx('wrap-body')}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin
