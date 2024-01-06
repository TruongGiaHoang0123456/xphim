import styles from './TopMovie.module.scss'
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Topic from '../Topic/Topic';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateActor, updateCountry, updateData, updateGenres, updateTopMovie } from '../../reducer/filterSlice';

let cx = classNames.bind(styles);

function TopMovie() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [showTopMonth, setShowTopMonth] = useState(true)
    const [showTopAll, setShowTopAll] = useState(false)
    const [showTopLikes, setShowDay] = useState(false)

    const [dataTopMonth, setDataTopMonth] = useState()
    const [dataTopAll, setDataTopAll] = useState()
    const [dataTopLikes, setDataTopLikes] = useState()

    useEffect(() => {
        async function getUser() {
            try {
                const res1 = axios.get(`http://127.0.0.1:4000/filter/top-film/month?limit=5`)
                const res2 = axios.get(`http://127.0.0.1:4000/filter/top-all?limit=5`)
                const res3 = axios.get(`http://127.0.0.1:4000/filter/top-likes?limit=5`)

                Promise.all([res1, res2, res3]).then(([res1, res2, res3]) => {
                    setDataTopMonth(res1.data)
                    setDataTopAll(res2.data)
                    setDataTopLikes(res3.data)
                })
            } catch (error) {
                console.error(error);
            }
        }
        getUser()
    }, [])

    const handleViewAll = () => {
        async function selectTopAll() {
            try {
                const response = await axios.get(`http://localhost:4000/filter/select-top-movie/all`);

                dispatch(updateData(response.data))
                dispatch(updateGenres(''))
                dispatch(updateActor(''))
                dispatch(updateCountry(''))
                dispatch(updateTopMovie('Top all'))
                navigate('/filter-movie')
            } catch (error) {
                console.error(error);
            }
        }
        selectTopAll()
    }

    const handleShow = (show) => {
        switch (show) {
            case 'month':
                setShowTopMonth(true);
                setShowTopAll(false);
                setShowDay(false);
                break;
            case 'Top all':
                setShowTopMonth(false);
                setShowTopAll(true);
                setShowDay(false);
                break;
            case 'Lượt like':
                setShowTopMonth(false);
                setShowTopAll(false);
                setShowDay(true);
                break;
            default:
                setShowTopMonth(false);
                setShowTopAll(false);
                setShowDay(false);
        }
    }

    return (
        <div className={cx('wrap-top-movie')}>
            < Topic mw0={true} mh0={true} content='Top phim sex' icon={<FontAwesomeIcon icon={faCrown} />} />

            <div className={cx('top-movie')}>

                <div className={cx('top-movie-before')}>
                    <div
                        onClick={() => { handleShow('month') }}
                        style={showTopMonth ? { 'background': '#d03a3a', 'color': '#fff' } : { 'color': '#eee' }}
                        className={cx('top-movie-title')}
                    >
                        Top Tháng
                    </div>

                    <div
                        onClick={() => { handleShow('Top all') }}
                        style={showTopAll ? { 'background': '#d03a3a', 'color': '#fff' } : { 'color': '#eee' }}
                        className={cx('top-movie-title')}
                    >
                        Top All
                    </div>

                    <div
                        onClick={() => { handleShow('Lượt like') }}
                        style={showTopLikes ? { 'background': '#d03a3a', 'color': '#fff' } : { 'color': '#eee' }}
                        className={cx('top-movie-title')}
                    >
                        Top Likes
                    </div>
                </div>

                {
                    showTopMonth &&
                    <ul className={cx('top-movie-after')}>
                        {
                            dataTopMonth?.map((item) => (
                                <li key={item.id} className={cx('top-movie-item')}>
                                    <Link to={`/watch-movie/${item.slug}`}>
                                        <div className={cx('wrap-img')}>
                                            <img alt={item.name} src={item.image} />
                                        </div>
                                        <div className={cx('wrap-infor')}>
                                            <h3>{item.name}</h3>
                                            <div className={cx('wrap-infor-interact')}>
                                                <div className={cx('views')}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span>{item.views}</span>
                                                </div>

                                                <div className={cx('likes')}>
                                                    <FontAwesomeIcon icon={faThumbsUp} />
                                                    <span>{item.likes}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                }


                {
                    showTopAll &&
                    <ul className={cx('top-movie-after')}>
                        {
                            dataTopAll?.map((item) => (
                                <li key={item.film_id} className={cx('top-movie-item')}>
                                    <Link to={`/watch-movie/${item.slug}`}>
                                        <div className={cx('wrap-img')}>
                                            <img alt={item.name} src={item.image} />
                                        </div>
                                        <div className={cx('wrap-infor')}>
                                            <h3>{item.name}</h3>
                                            <div className={cx('wrap-infor-interact')}>
                                                <div className={cx('views')}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span>{item.views}</span>
                                                </div>

                                                <div className={cx('likes')}>
                                                    <FontAwesomeIcon icon={faThumbsUp} />
                                                    <span>{item.likes}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                }


                {
                    showTopLikes &&
                    <ul className={cx('top-movie-after')}>
                        {
                            dataTopLikes?.map((item) => (
                                <li key={item.film_id} className={cx('top-movie-item')}>
                                    <Link to={`/watch-movie/${item.slug}`}>
                                        <div className={cx('wrap-img')}>
                                            <img alt={item.name} src={item.image} />
                                        </div>
                                        <div className={cx('wrap-infor')}>
                                            <h3>{item.name}</h3>
                                            <div className={cx('wrap-infor-interact')}>
                                                <div className={cx('views')}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span>{item.views}</span>
                                                </div>

                                                <div className={cx('likes')}>
                                                    <FontAwesomeIcon icon={faThumbsUp} />
                                                    <span>{item.likes}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                }


                <div className={cx('top-movie-all')}>
                    <Link onClick={handleViewAll}>Xem tất cả</Link>
                </div>
            </div>

        </div>
    )
}

export default TopMovie