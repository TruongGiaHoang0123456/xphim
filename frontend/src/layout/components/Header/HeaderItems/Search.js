import { useState, useEffect, memo } from 'react'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown, faEye, faHouse, faMagnifyingGlass, faThumbsUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

import styles from './HeaderItems.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateActor, updateCountry, updateData, updateGenres, updateTopMovie } from '../../../../reducer/filterSlice';

import { useSelector } from 'react-redux';

let cx = classNames.bind(styles);

function Search({ showSelectSearchMobile, setShowSelectSearchMobile }) {

    const { selectGenres, selectActor, selectCountry, selectTopMovie } = useSelector(state => state.filter)

    // value search
    const [searchValue, setSearchValue] = useState('')

    const navigate = useNavigate()

    const location = useLocation()

    // use dispatch
    const dispatch = useDispatch()

    const [showSearch, setShowSearch] = useState(false)

    // data
    const [genres, setGenres] = useState()
    const [actors, setActors] = useState()
    const [countrys, setCountrys] = useState()

    const [showGenresMobile, setShowGenresMobile] = useState(false)
    const [showActorsMobile, setShowActorsMobile] = useState(false)
    const [showCountrysMobile, setShowCountrysMobile] = useState(false)
    const [showTopMoviesMobile, setShowTopMoviesMobile] = useState(false)

    // data
    const [data, setData] = useState(null)

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

    useEffect(() => {
        if (searchValue !== '') {
            const id = setTimeout(() => {

                async function getUser() {
                    try {
                        const response = await axios.get(`http://localhost:4000/films/search-film`, {
                            params: {
                                searchValue: searchValue
                            }
                        });

                        console.log('response.data', response.data);

                        setData(response.data)
                    } catch (error) {
                        console.error(error);
                    }
                }
                getUser()
            }, 1000)

            return () => {
                clearTimeout(id)
            }
        } else {
            setData(null)
        }
    }, [searchValue])

    // handle search film reducer
    const handleClickSearch = () => {
        if (searchValue.trim() === '') {
            alert('Bạn chưa nhập từ khóa tìm kiếm')
        } else {
            navigate(`/search-film?searchValue=${searchValue}`)
            setShowSearch(false)
            setShowSelectSearchMobile(false)
        }
    }

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
                setShowSelectSearchMobile(false)
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
                setShowSelectSearchMobile(false)
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
                setShowSelectSearchMobile(false)
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
                setShowSelectSearchMobile(false)
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
                setShowSelectSearchMobile(false)
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
                setShowSelectSearchMobile(false)
            } catch (error) {
                console.error(error);
            }
        }
        selectTop()
    }

    return (
        <div className={cx('wrap-search')}>
            <div className={cx('search', 'hide-on-m')}>
                <div className={cx('before')}>
                    <label htmlFor='header-search' onClick={handleClickSearch}>
                        <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                    </label>
                    <input
                        id='header-search'
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                        onClick={() => {
                            setShowSearch(true)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleClickSearch()
                            }
                        }}
                        placeholder='Nhập từ khóa...'
                        spellCheck={false}
                    />
                    <button
                        onClick={handleClickSearch}
                    >
                        Tìm kiếm
                    </button>

                </div>

                {
                    data && showSearch && (
                        <ul className={cx('after')}>
                            {data.map((item, index) => (
                                <li key={index}>
                                    <Link onClick={() => {
                                        setSearchValue('')
                                    }} to={`/watch-movie/${item.slug}`}
                                        className={cx('conver-page-search')}>
                                        <div className={cx('wrap-avartar')}>
                                            <img alt='avata' src={item.image} />
                                        </div>

                                        <div className={cx('details')}>
                                            <h3 className={cx('name')}>{item.name}</h3>
                                            <div className={cx('wrap-evaluate')}>
                                                <div className={cx('wrap-view')}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span>
                                                        {item.views}
                                                    </span>
                                                </div>
                                                <div className={cx('wrap-like')}>
                                                    <FontAwesomeIcon icon={faThumbsUp} />
                                                    <span>
                                                        {item.likes}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>

            <div className={cx('search-mobile', 'hide-on-t', 'hide-on-ps-pl')}>
                <div className={cx('wrap-icon')}>
                    <FontAwesomeIcon onClick={() => {
                        setShowSelectSearchMobile(!showSelectSearchMobile)
                    }} className={cx('search-icon')} icon={faMagnifyingGlass} />
                    {showSelectSearchMobile ?
                        <FontAwesomeIcon onClick={() => {
                            setShowSelectSearchMobile(false)
                        }} className={cx('menu-icon')} icon={faXmark} />
                        :
                        <FontAwesomeIcon onClick={() => {
                            setShowSelectSearchMobile(true)
                        }} className={cx('menu-icon')} icon={faBars} />
                    }
                </div>

                {showSelectSearchMobile && <div className={cx('wrap-select-search')}>
                    <div className={cx('wrap-input-search-mobile')}>
                        <div className={cx('before')}>
                            <input
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value)
                                }}
                                onClick={() => {
                                    setShowSearch(true)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleClickSearch()
                                    }
                                }}
                                placeholder='Nhập từ khóa'
                            />
                            <div onClick={handleClickSearch} className={cx('wrap-icon')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                        </div>
                        {console.log('search', showSearch)}

                        {
                            data && showSearch && (
                                <ul className={cx('after')}>
                                    {data.map((item, index) => (
                                        <li key={index}>
                                            <Link onClick={() => {
                                                setShowSelectSearchMobile(false)
                                                setSearchValue('')
                                            }} to={`/watch-movie/${item.slug}`} className={cx('conver-page-search')}>
                                                <div className={cx('wrap-avartar')}>
                                                    <img alt='avata' src={item.image} />
                                                </div>

                                                <div className={cx('details')}>
                                                    <h3 className={cx('name')}>{item.name}</h3>
                                                    <div className={cx('wrap-evaluate')}>
                                                        <div className={cx('wrap-view')}>
                                                            <FontAwesomeIcon icon={faEye} />
                                                            <span>
                                                                {item.views}
                                                            </span>
                                                        </div>
                                                        <div className={cx('wrap-like')}>
                                                            <FontAwesomeIcon icon={faThumbsUp} />
                                                            <span>
                                                                {item.likes}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </div>

                    <Link
                        to='/'
                        className={cx('wrap-home')}
                        style={
                            location.pathname === '/' ?
                                { 'color': '#ffae3c' } : { 'color': '#eee' }
                        }
                    >
                        <FontAwesomeIcon icon={faHouse} />
                        <span>Phim sex</span>
                    </Link>

                    <div className={cx('wrap-topic')}>
                        <div
                            style={showGenresMobile ?
                                { 'color': '#ffae3c' } : { 'color': '#eee' }
                            }
                            className={cx('wrap-name')}
                            onClick={() => {
                                setShowGenresMobile(!showGenresMobile)
                            }}>
                            <span>Thể loại</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        {showGenresMobile && <ul className={`row ${cx('topic-list')}`}>
                            {
                                genres.map(genre => (
                                    <li key={genre.id} className={`m-6 ${cx('topic-item')}`}>
                                        <Link
                                            style={selectGenres.includes(genre.genre) ?
                                                { 'background': '#d03a3a' } : { 'background': '#252525' }
                                            }
                                            onClick={() => {
                                                handleFilterGenre(genre.genre)
                                            }}
                                            className={cx('topic-link')}
                                        >
                                            {genre.genre}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>}
                    </div>

                    <div className={cx('wrap-topic')}>
                        <div
                            style={showActorsMobile ?
                                { 'color': '#ffae3c' } : { 'color': '#eee' }
                            }
                            className={cx('wrap-name')}
                            onClick={() => {
                                setShowActorsMobile(!showActorsMobile)
                            }}>
                            <span>Diễn viên</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        {
                            showActorsMobile &&
                            <ul className={`row ${cx('topic-list')}`}>
                                {actors.map(actor => (
                                    <li key={actor.id} className={`m-6 ${cx('topic-item')}`}>
                                        <Link
                                            style={selectActor === actor.actor ?
                                                { 'background': '#d03a3a' } : { 'background': '#252525' }
                                            }
                                            className={cx('topic-link')}
                                            onClick={() => {
                                                handleFilterActor(actor.actor)
                                            }}
                                        >
                                            {actor.actor}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>

                    <div className={cx('wrap-topic')}>
                        <div
                            className={cx('wrap-name')}
                            style={showCountrysMobile ?
                                { 'color': '#ffae3c' } : { 'color': '#eee' }
                            }
                            onClick={() => {
                                setShowCountrysMobile(!showCountrysMobile)
                            }}>
                            <span>Quốc gia</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        {
                            showCountrysMobile &&
                            <ul className={`row ${cx('topic-list')}`}>
                                {countrys.map(country => (
                                    <li key={country.id} className={`m-6 ${cx('topic-item')}`}>
                                        <Link
                                            style={selectCountry === country.country ?
                                                { 'background': '#d03a3a' } : { 'background': '#252525' }
                                            }
                                            className={cx('topic-link')}
                                            onClick={() => {
                                                handleFilterCountry(country.country)
                                            }}
                                        >
                                            {country.country}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>

                    <div className={cx('wrap-topic')}>
                        <div
                            style={showTopMoviesMobile ?
                                { 'color': '#ffae3c' } : { 'color': '#eee' }
                            }
                            className={cx('wrap-name')}
                            onClick={() => {
                                setShowTopMoviesMobile(!showTopMoviesMobile)
                            }}
                        >
                            <span>Top phim</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        {showTopMoviesMobile && <ul className={`row ${cx('topic-list')}`}>
                            <li className={`m-6 ${cx('topic-item')}`}>
                                <Link
                                    style={selectTopMovie === 'Lượt like' ?
                                        { 'background': '#d03a3a' } : { 'background': '#252525' }
                                    }
                                    onClick={handleFilterTopLike}
                                    className={cx('topic-link')}
                                >
                                    Top like
                                </Link>
                            </li>
                            <li className={`m-6 ${cx('topic-item')}`}>
                                <Link
                                    style={selectTopMovie === 'Top all' ?
                                        { 'background': '#d03a3a' } : { 'background': '#252525' }
                                    }
                                    onClick={handleFilterTopAll}
                                    className={cx('topic-link')}
                                >
                                    Top all
                                </Link>
                            </li>
                            <li className={`m-6 ${cx('topic-item')}`}>
                                <Link
                                    style={selectTopMovie === 'month' ?
                                        { 'background': '#d03a3a' } : { 'background': '#252525' }
                                    }
                                    onClick={() => {
                                        handleFilterTopViews('month')
                                    }}
                                    className={cx('topic-link')}
                                >
                                    Top tháng
                                </Link>
                            </li>
                            <li className={`m-6 ${cx('topic-item')}`}>
                                <Link
                                    style={selectTopMovie === 'week' ?
                                        { 'background': '#d03a3a' } : { 'background': '#252525' }
                                    }
                                    onClick={() => {
                                        handleFilterTopViews('week')
                                    }}
                                    className={cx('topic-link')}
                                >
                                    Top tuần
                                </Link>
                            </li>
                            <li className={`m-6 ${cx('topic-item')}`}>
                                <Link
                                    style={selectTopMovie === 'day' ?
                                        { 'background': '#d03a3a' } : { 'background': '#252525' }
                                    }
                                    onClick={() => {
                                        handleFilterTopViews('day')
                                    }}
                                    className={cx('topic-link')}
                                >
                                    Top ngày
                                </Link>
                            </li>
                        </ul>}
                    </div>
                </div>}
            </div>
        </div>

    )
}

export default memo(Search)