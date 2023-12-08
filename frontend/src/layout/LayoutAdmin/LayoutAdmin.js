import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './LayoutAdmin.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faEarthAmerica, faFilm, faFolderClosed, faGauge, faGenderless, faInfoCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

let cx = classNames.bind(styles);

function LayoutAdmin({ children }) {

    const [showMenuFilm, setShowMenuFilm] = useState(false)

    return (
        <div className={cx('layout-admin')}>
            <div className='row-m-0'>
                <div className=' l-2 t-2 m-2'>
                    <div className={cx('side-bar')}>
                        <Link className={cx('wrap-logo')} to='/'>
                            <img alt='logo' className={cx('logo')} src='/logo.png' />
                        </Link>

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

                            <div className={cx('category')}>
                                <div className={cx('first')}>
                                    <div className={cx('before')}>
                                        <FontAwesomeIcon className={cx('icon-category')} icon={faFolderClosed} />
                                        <span className={cx('name-category')}>Danh mục phim</span>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('category')}>
                                <div className={cx('first')}>
                                    <div className={cx('before')}>
                                        <FontAwesomeIcon className={cx('icon-category')} icon={faGenderless} />
                                        <span className={cx('name-category')}>Thể loại phim</span>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('category')}>
                                <div className={cx('first')}>
                                    <div className={cx('before')}>
                                        <FontAwesomeIcon className={cx('icon-category')} icon={faEarthAmerica} />
                                        <span className={cx('name-category')}>Quốc gia phim</span>
                                    </div>
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
                                        <Link to='/admin/list-film' className={cx('before')}>
                                            <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                                            <span className={cx('name-category')}>Danh sách phim</span>
                                        </Link>

                                        <Link to='/admin/add-film' className={cx('before')}>
                                            <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                                            <span className={cx('name-category')}>Thêm phim</span>
                                        </Link>
                                    </div>
                                }
                            </div>

                            <div className={cx('category')}>
                                <div className={cx('first')}>
                                    <div className={cx('before')}>
                                        <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                                        <span className={cx('name-category')}>Thêm phim</span>
                                    </div>
                                </div>
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
