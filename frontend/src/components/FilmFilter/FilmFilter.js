import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFilter, faRankingStar, faShapes } from '@fortawesome/free-solid-svg-icons'

import styles from './FilmFilter.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

let cx = classNames.bind(styles);

function FilmFilter({ handleShowFilmFilter, handleUnShowFilmFilter }) {
    const [data, setData] = useState()
    const [showFilmFilter, setShowFilmFilter] = useState(true)
    const [showMovieGenre, setShowMovieGenre] = useState(true)
    const [showMovieYear, setShowMovieYear] = useState(false)

    const movieGenreRef = useRef()
    const movieYearRef = useRef()

    const handleShowMovieGenre = (e) => {
        setShowMovieGenre(true)
        setShowMovieYear(false)

        movieGenreRef.current.style = 'background-color: #9c3737'
        movieYearRef.current.style = 'background-color: #1c1c1c'
    }

    const handleShowMovieYear = (e) => {
        setShowMovieYear(true)
        setShowMovieGenre(false)

        movieYearRef.current.style = 'background-color: #9c3737'
        movieGenreRef.current.style = 'background-color: #1c1c1c'
    }

    // render filter
    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(`http://127.0.0.1:4000/films/filter-film/filter-list`)
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getUser()
    }, [])

    return (
        <div>
            {showFilmFilter && <div className={cx('film-filter')}>
                <ul>
                    <li onClick={handleShowMovieGenre} style={{ 'backgroundColor': '#9c3737' }} ref={movieGenreRef}>
                        <Link>
                            <FontAwesomeIcon className={cx('icon')} icon={faShapes} />
                            <span>Thể loại</span>
                        </Link>
                    </li>
                    <li onClick={handleShowMovieYear} ref={movieYearRef}>
                        <Link>
                            <FontAwesomeIcon className={cx('icon')} icon={faCalendar} />
                            <span>Năm</span>
                        </Link>
                    </li>
                    <li onClick={handleUnShowFilmFilter}>
                        <Link to='/filter-movie'>
                            <FontAwesomeIcon className={cx('icon')} icon={faFilter} />
                            <span>Lọc phim</span>
                        </Link>
                    </li>
                    <li onClick={handleUnShowFilmFilter}>
                        <Link to='/filter-movie?phim-le'>
                            <FontAwesomeIcon className={cx('icon')} icon={faRankingStar} />
                            <span>Phim lẻ</span>
                        </Link>
                    </li>
                </ul>

                {/* list-gender */}
                {showMovieGenre &&
                    <div className={cx('list-gender')}>
                        {data && data.genres.map((item, index) => (
                            <Link
                                onClick={handleUnShowFilmFilter}
                                to={`/filter-movie?genre=${item.genre}`}
                                key={index}
                            >
                                {item.genre}
                            </Link>
                        ))}
                    </div>
                }

                {showMovieYear &&
                    <div className={cx('list-gender')}>
                        {data && data.years.map((item, index) => (
                            <Link
                                onClick={handleUnShowFilmFilter}
                                to={`/filter-movie?year=${item.year}`}
                                key={index}
                            >
                                {item.year}
                            </Link>
                        ))}
                    </div>
                }
            </div>}
        </div>
    )
}

export default FilmFilter;
