import { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCircleXmark, faClockRotateLeft, faHouse, faList, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss'
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
        <header className={cx('wrap-header')}>
            <div className='grid'>
                <div className='wide'>
                    <div className={cx('header')}>
                        <Link to='/' onClick={handleUnShowFilmFilter} className={cx('header-logo')}>
                            <img alt='logo' className={cx('logo')} src='/logo.png' />
                        </Link>

                        {/* search */}
                        {<Search show={showSearch} />}
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header