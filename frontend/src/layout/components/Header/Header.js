import { useState } from 'react'
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss'
import Search from './HeaderItems/Search';
import { useDispatch } from 'react-redux';
import { updateActor, updateCountry, updateData, updateGenres, updateTopMovie } from '../../../reducer/filterSlice';

let cx = classNames.bind(styles);

function Header() {
    const [showSelectSearchMobile, setShowSelectSearchMobile] = useState(false)

    // use dispatch
    const dispatch = useDispatch()

    const [showFilmFilter, setShowFilmFilter] = useState(false)

    const handleUnShowFilmFilter = () => {
        setShowFilmFilter(false)
        setShowSelectSearchMobile(false)

        dispatch(updateData(null))
        dispatch(updateGenres(''))
        dispatch(updateActor(''))
        dispatch(updateCountry(''))
        dispatch(updateTopMovie(''))
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
                        {<Search
                            showSelectSearchMobile={showSelectSearchMobile}
                            setShowSelectSearchMobile={setShowSelectSearchMobile}
                        />}
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header