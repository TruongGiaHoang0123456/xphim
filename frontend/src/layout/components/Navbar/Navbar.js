import { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCircleXmark, faClockRotateLeft, faHouse, faList, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import styles from './Navbar.module.scss'
import FilmFilter from '../../../components/FilmFilter';
import MenuUser from '../../../components/MenuUser';
import Search from './HeaderItems/Search';
import { useDispatch } from 'react-redux';

let cx = classNames.bind(styles);

function Header() {

    const [showSearch, setShowSearch] = useState(false)

    // use navigate
    const navigate = useNavigate()

    // use dispatch
    const dispatch = useDispatch()

    // use selector
    const inforUser = useSelector((state) => {
        return state.user.value
    })

    const [showFilmFilter, setShowFilmFilter] = useState(false)

    const handleShowFilmFilter = () => {
        setShowFilmFilter(true)
    }

    const handleUnShowFilmFilter = () => {
        setShowFilmFilter(false)
    }

    return (
        <div className={cx('navbar')}>
            <div className='grid'>
                <div className='wide'>
                    <ul className={cx('navbar-list')}>
                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie/loan-luan`} className={cx('wrap-topic')}>
                                <FontAwesomeIcon icon={faHouse} />
                                <span className={cx('topic')}>
                                    Phim sex
                                </span>
                            </Link>
                        </li>

                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie`} className={cx('wrap-topic')}>
                                <span className={cx('topic')}>
                                    Việt Sub
                                </span>
                            </Link>
                        </li>

                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie`} className={cx('wrap-topic')}>
                                <span className={cx('topic')}>
                                    Không Che
                                </span>
                            </Link>
                        </li>

                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie`} className={cx('wrap-topic')}>
                                <span className={cx('topic')}>
                                    Hiếp Dâm
                                </span>
                            </Link>
                        </li>

                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie`} className={cx('wrap-topic')}>
                                <span className={cx('topic')}>
                                    Loạn luân
                                </span>
                            </Link>
                        </li>

                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie`} className={cx('wrap-topic')}>
                                <span className={cx('topic')}>
                                    Vụng trộm
                                </span>
                            </Link>
                        </li>

                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie`} className={cx('wrap-topic')}>
                                <span className={cx('topic')}>
                                    Âu Mỹ
                                </span>
                            </Link>
                        </li>

                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie`} className={cx('wrap-topic')}>
                                <span className={cx('topic')}>
                                    Trung Quốc
                                </span>
                            </Link>
                        </li>

                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie`} className={cx('wrap-topic')}>
                                <span className={cx('topic')}>
                                    Việt Nam
                                </span>
                            </Link>
                        </li>

                        <li className={cx('navbar-item')}>
                            <Link to={`/filter-movie`} className={cx('wrap-topic')}>
                                <span className={cx('topic')}>
                                    Top Sex
                                </span>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Header