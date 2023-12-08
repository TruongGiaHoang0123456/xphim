import styles from './TopMovie.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import Topic from '../Topic';
import { useState } from 'react';

let cx = classNames.bind(styles);

function TopMovie() {

    const [showTopMonth, setShowTopMonth] = useState(true)
    const [showTopWeek, setShowWeek] = useState(false)
    const [showTopDay, setShowDay] = useState(false)

    const handleShow = (show) => {
        switch (show) {
            case 'month':
                setShowTopMonth(true);
                setShowWeek(false);
                setShowDay(false);
                break;
            case 'week':
                setShowTopMonth(false);
                setShowWeek(true);
                setShowDay(false);
                break;
            case 'day':
                setShowTopMonth(false);
                setShowWeek(false);
                setShowDay(true);
                break;
            default:
                setShowTopMonth(false);
                setShowWeek(false);
                setShowDay(false);
        }
    }

    return (
        <div className={cx('wrap-top-movie')}>
            < Topic mw0={true} mh0={true} content='Top phim sex' icon={<FontAwesomeIcon icon={faCrown} />} />

            <div className={cx('top-movie')}>

                <div className={cx('top-movie-before')}>
                    <div onClick={() => { handleShow('month') }} style={showTopMonth ? { 'background': '#b73a3a', 'color': '#fff' } : { 'color': '#eee' }} className={cx('top-movie-title')}>Top Tháng</div>
                    <div onClick={() => { handleShow('week') }} style={showTopWeek ? { 'background': '#b73a3a', 'color': '#fff' } : { 'color': '#eee' }} className={cx('top-movie-title')}>Top Tuần</div>
                    <div onClick={() => { handleShow('day') }} style={showTopDay ? { 'background': '#b73a3a', 'color': '#fff' } : { 'color': '#eee' }} className={cx('top-movie-title')}>Top Ngày</div>
                </div>

                {
                    showTopMonth &&
                    <ul className={cx('top-movie-after')}>
                        <li className={cx('top-movie-item')}>
                            <Link>
                                <div className={cx('wrap-img')}>
                                    <img />
                                </div>
                                <div className={cx('wrap-infor')}>
                                    <h3>Võ Luyện đỉnh phong1</h3>
                                    <span>7.891k</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                }


                {
                    showTopWeek &&
                    <ul className={cx('top-movie-after')}>
                        <li className={cx('top-movie-item')}>
                            <Link>
                                <div className={cx('wrap-img')}>
                                    <img />
                                </div>
                                <div className={cx('wrap-infor')}>
                                    <h3>Võ Luyện đỉnh phong2</h3>
                                    <span>7.891k</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                }


                {
                    showTopDay &&
                    <ul className={cx('top-movie-after')}>
                        <li className={cx('top-movie-item')}>
                            <Link>
                                <div className={cx('wrap-img')}>
                                    <img />
                                </div>
                                <div className={cx('wrap-infor')}>
                                    <h3>Võ Luyện đỉnh phong3</h3>
                                    <span>7.891k</span>
                                </div>
                            </Link>
                        </li>
                        <li className={cx('top-movie-item')}>
                            <Link>
                                <div className={cx('wrap-img')}>
                                    <img />
                                </div>
                                <div className={cx('wrap-infor')}>
                                    <h3>Võ Luyện đỉnh phong3</h3>
                                    <span>7.891k</span>
                                </div>
                            </Link>
                        </li>
                        <li className={cx('top-movie-item')}>
                            <Link>
                                <div className={cx('wrap-img')}>
                                    <img />
                                </div>
                                <div className={cx('wrap-infor')}>
                                    <h3>Võ Luyện đỉnh phong3</h3>
                                    <span>7.891k</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                }



                <div className={cx('top-movie-all')}>
                    <span>Xem tất cả</span>
                </div>
            </div>

        </div>
    )
}

export default TopMovie