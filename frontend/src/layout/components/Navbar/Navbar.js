import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './Navbar.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { updateActor, updateCountry, updateData, updateGenres, updateTopMovie } from '../../../reducer/filterSlice';
import { useEffect, useState } from 'react';

let cx = classNames.bind(styles);

function Navbar() {
    // use navigate
    const navigate = useNavigate()

    const { selectGenres, selectActor, selectCountry, selectTopMovie } = useSelector(state => state.filter)

    // use dispatch
    const dispatch = useDispatch()

    const [showGenres, setShowGenres] = useState(false)
    const [showActors, setShowActors] = useState(false)
    const [showCountrys, setShowCountrys] = useState(false)
    const [showTopMovie, setShowTopMovie] = useState(false)

    const [genres, setGenres] = useState()
    const [actors, setActors] = useState()
    const [countrys, setCountrys] = useState()

    useEffect(() => {
        async function getUser() {
            try {
                const genres = await axios.get('http://localhost:4000/films/genres-film');
                const actors = await axios.get('http://localhost:4000/films/actors-film');
                const countrys = await axios.get('http://localhost:4000/films/countrys-film');

                Promise.all([genres, actors, countrys]).then(([genres, actors, countrys]) => {
                    setGenres(genres.data)
                    setActors(actors.data)
                    setCountrys(countrys.data)
                })
            } catch (error) {
                console.error(error);
            }
        }
        getUser()
    }, [])

    const handleFilterGenre = (genre) => {
        async function selectTopAll() {
            try {
                const response = await axios.get('http://localhost:4000/filter/select-genres', {
                    params: {
                        genres: [genre]
                    }
                });

                dispatch(updateData(response.data))
                dispatch(updateGenres(''))
                dispatch(updateActor(''))
                dispatch(updateCountry(''))
                dispatch(updateTopMovie(''))
                dispatch(updateGenres(genre))
                navigate('/filter-movie')
                setShowGenres(false)
            } catch (error) {
                console.error(error);
            }
        }
        selectTopAll()
    }

    const handleFilterActor = (actor) => {

        async function selectActor() {
            try {
                const response = await axios.get(`http://localhost:4000/filter/select-actor/${actor}`);

                dispatch(updateData(response.data))
                dispatch(updateGenres(''))
                dispatch(updateActor(''))
                dispatch(updateCountry(''))
                dispatch(updateTopMovie(''))
                dispatch(updateActor(actor))
                navigate('/filter-movie')
                setShowActors(false)
            } catch (error) {
                console.error(error);
            }
        }
        selectActor()
    }

    const handleFilterCountry = (country) => {

        async function selectCountry() {
            try {
                const response = await axios.get(`http://localhost:4000/filter/select-country/${country}`);

                dispatch(updateData(response.data))
                dispatch(updateGenres(''))
                dispatch(updateActor(''))
                dispatch(updateCountry(''))
                dispatch(updateTopMovie(''))
                dispatch(updateCountry(country))
                navigate('/filter-movie')
                setShowCountrys(false)
            } catch (error) {
                console.error(error);
            }
        }
        selectCountry()
    }

    const handleFilterTopAll = () => {

        async function selectTopAll() {
            try {
                const response = await axios.get(`http://localhost:4000/filter/select-top-movie/all`);

                dispatch(updateData(response.data))
                dispatch(updateGenres(''))
                dispatch(updateActor(''))
                dispatch(updateCountry(''))
                dispatch(updateTopMovie('Top all'))
                navigate('/filter-movie')
                setShowTopMovie(false)
            } catch (error) {
                console.error(error);
            }
        }
        selectTopAll()
    }

    const handleFilterTopLike = () => {

        async function selectTopLike() {
            try {
                const response = await axios.get(`http://localhost:4000/filter/select-top-movie/likes`);

                dispatch(updateData(response.data))
                dispatch(updateGenres(''))
                dispatch(updateActor(''))
                dispatch(updateCountry(''))
                dispatch(updateTopMovie('Lượt like'))
                navigate('/filter-movie')
                setShowTopMovie(false)
            } catch (error) {
                console.error(error);
            }
        }
        selectTopLike()
    }

    const handleFilterTopViews = (top) => {

        async function selectTop() {
            try {
                const response = await axios.get(`http://localhost:4000/filter/select-top-movie/${top}`);

                dispatch(updateData(response.data))
                dispatch(updateGenres(''))
                dispatch(updateActor(''))
                dispatch(updateCountry(''))
                dispatch(updateTopMovie(top))
                navigate('/filter-movie')
                setShowTopMovie(false)
            } catch (error) {
                console.error(error);
            }
        }
        selectTop()
    }

    return (
        <div className={` hide-on-m ${cx('navbar')}`}>
            <div className='grid'>
                <div className='wide'>
                    <ul className={cx('navbar-list')}>
                        <li className={cx('navbar-item')}>
                            <div to={`/filter-movie/loan-luan`} className={cx('wrap-topic')}>
                                <FontAwesomeIcon icon={faHouse} />
                                <span className={cx('topic')}>
                                    Phim sex
                                </span>
                            </div>
                        </li>

                        <li className={cx('navbar-item')}>
                            <div style={selectGenres.length === 1 && selectGenres[0] === 'Việt Sub' ? { 'background': '#b73a3a' } : { 'background': '#252525' }}
                                to={`/filter-movie`} className={cx('wrap-topic')}
                                onClick={() => {
                                    handleFilterGenre('Việt Sub')
                                }}
                            >
                                <span className={cx('topic')}>
                                    Việt Sub
                                </span>
                            </div>
                        </li>

                        <li onClick={() => {
                            handleFilterGenre('Không Che')
                        }} className={cx('navbar-item')}>
                            <div
                                style={selectGenres.length === 1 && selectGenres[0] === 'Không Che' ?
                                    { 'background': '#b73a3a' } : { 'background': '#252525' }
                                }
                                to={`/filter-movie`}
                                className={cx('wrap-topic')}
                            >
                                <span className={cx('topic')}>
                                    Không Che
                                </span>
                            </div>
                        </li>

                        <li onClick={() => {
                            handleFilterGenre('Hiếp Dâm')
                        }} className={cx('navbar-item')}>
                            <div
                                style={selectGenres.length === 1 && selectGenres[0] === 'Hiếp Dâm' ?
                                    { 'background': '#b73a3a' } : { 'background': '#252525' }
                                }
                                to={`/filter-movie`}
                                className={cx('wrap-topic')}
                            >
                                <span className={cx('topic')}>
                                    Hiếp Dâm
                                </span>
                            </div>
                        </li>

                        <li className={cx('navbar-genre')}>

                            <div onClick={() => {
                                setShowGenres(!showGenres)
                                setShowActors(false)
                                setShowCountrys(false)
                                setShowTopMovie(false)
                            }}
                                style={showGenres ?
                                    { 'background': '#b73a3a' } : { 'background': '#252525' }}
                                className={cx('wrap-genre-topic')}
                            >
                                <span className={cx('genre-topic')}>Thể loại</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>

                            {showGenres &&
                                <ul className={`row ${cx('genre-list')}`}>
                                    {
                                        genres?.map(genre => (
                                            <li key={genre.id} className={`l-3 ${cx('genre-item')}`}>
                                                <Link
                                                    style={selectGenres.includes(genre.genre) ?
                                                        { 'background': '#b73a3a' } : { 'background': '#252525' }
                                                    }
                                                    onClick={() => {
                                                        handleFilterGenre(genre.genre)
                                                    }}
                                                >
                                                    {genre.genre}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                        </li>

                        <li className={cx('navbar-actor')}>
                            <div
                                onClick={() => {
                                    setShowGenres(false)
                                    setShowActors(!showActors)
                                    setShowCountrys(false)
                                    setShowTopMovie(false)
                                }}
                                style={showActors ?
                                    { 'background': '#b73a3a' } : { 'background': '#252525' }}
                                className={cx('wrap-actor-topic')}
                            >
                                <span className={cx('actor-topic')}>Diễn viên</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            {showActors &&
                                <ul className={`row ${cx('actor-list')}`}>
                                    {
                                        actors?.map(actor => (
                                            <li key={actor.id} className={`l-3 ${cx('actor-item')}`}>
                                                <Link
                                                    style={selectActor === actor.actor ?
                                                        { 'background': '#b73a3a' } : { 'background': '#252525' }
                                                    }
                                                    onClick={() => {
                                                        handleFilterActor(actor.actor)
                                                    }}
                                                >
                                                    {actor.actor}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                        </li>

                        <li className={cx('navbar-country')}>
                            <div
                                onClick={() => {
                                    setShowCountrys(!showCountrys)
                                    setShowGenres(false)
                                    setShowActors(false)
                                    setShowTopMovie(false)
                                }}
                                style={showCountrys ?
                                    { 'background': '#b73a3a' } : { 'background': '#252525' }
                                }
                                className={cx('wrap-country-topic')}
                            >
                                <span className={cx('country-topic')}>Quốc gia</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>

                            {showCountrys &&
                                <ul className={`row ${cx('country-list')}`}>
                                    {
                                        countrys?.map(country => (
                                            <li key={country.id} className={`l-6 ${cx('country-item')}`}>
                                                <Link
                                                    style={selectCountry === country.country ?
                                                        { 'background': '#b73a3a' } : { 'background': '#252525' }
                                                    }
                                                    key={country.id}
                                                    onClick={() => {
                                                        handleFilterCountry(country.country)
                                                    }}
                                                >
                                                    {country.country}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                        </li>

                        <li
                            className={cx('navbar-top-movie')}>
                            <div onClick={() => {
                                setShowGenres(false)
                                setShowActors(false)
                                setShowCountrys(false)
                                setShowTopMovie(!showTopMovie)
                            }}
                                style={showTopMovie ?
                                    { 'background': '#b73a3a' } : { 'background': '#252525' }
                                }
                                className={cx('wrap-top-movie-topic')}
                            >
                                <span className={cx('top-movie-topic')}>Top phim</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>

                            {showTopMovie &&
                                <ul className={`row ${cx('top-movie-list')}`}>
                                    <li className={`l-3 ${cx('top-movie-item')}`}>
                                        <Link
                                            style={selectTopMovie === 'Lượt like' ?
                                                { 'background': '#b73a3a' } : { 'background': '#252525' }
                                            }
                                            onClick={handleFilterTopLike}
                                        >
                                            Top like
                                        </Link>
                                    </li>

                                    <li className={`l-3 ${cx('top-movie-item')}`}>
                                        <Link
                                            style={selectTopMovie === 'Top all' ?
                                                { 'background': '#b73a3a' } : { 'background': '#252525' }
                                            }
                                            onClick={handleFilterTopAll}
                                        >
                                            Top all
                                        </Link>
                                    </li>

                                    <li className={`l-3 ${cx('top-movie-item')}`}>
                                        <Link
                                            style={selectTopMovie === 'month' ?
                                                { 'background': '#b73a3a' } : { 'background': '#252525' }
                                            }
                                            onClick={() => {
                                                handleFilterTopViews('month')
                                            }}
                                        >Top tháng
                                        </Link>
                                    </li>

                                    <li className={`l-3 ${cx('top-movie-item')}`}>
                                        <Link
                                            style={selectTopMovie === 'week' ?
                                                { 'background': '#b73a3a' } : { 'background': '#252525' }
                                            }
                                            onClick={() => {
                                                handleFilterTopViews('week')
                                            }}
                                        >
                                            Top tuần
                                        </Link>
                                    </li>
                                    <li className={`l-3 ${cx('top-movie-item')}`}>
                                        <Link
                                            style={selectTopMovie === 'day' ?
                                                { 'background': '#b73a3a' } : { 'background': '#252525' }
                                            }
                                            onClick={() => {
                                                handleFilterTopViews('day')
                                            }}
                                        >
                                            Top ngày
                                        </Link>
                                    </li>
                                </ul>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar