import classNames from 'classnames/bind';
import { Link } from "react-router-dom";

import styles from './BottmBody.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import TopMovie from '../TopMovie/TopMovie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topic from '../Topic/Topic';

let cx = classNames.bind(styles);

const BottmBody = () => {

    const [actorsData, setActorsData] = useState()
    const [searchData, setSearchData] = useState()

    useEffect(() => {
        async function getData() {
            try {
                const response1 = axios.get(`http://127.0.0.1:4000/filter/top-Actors`, {
                    params: {
                        limit: 16
                    }
                })
                const response2 = axios.get(`http://127.0.0.1:4000/filter/top-searchs`, {
                    params: {
                        limit: 16
                    }
                })

                Promise.all([response1, response2]).then(([response1, response2]) => {
                    setActorsData(response1.data)
                    setSearchData(response2.data)
                })
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])

    return (
        <div className={`hide-on-ps-pl ${cx('wrap-bottom-body')}`}>
            <div className={'hide-on-ps-pl'}>
                <TopMovie />
            </div>

            <div className={cx('wrap-top-actor')}>
                <Topic mw0 content='Top diễn viên' icon={<FontAwesomeIcon icon={faCrown} />} />
                <ul className={cx('top-actor-list')}>
                    {
                        actorsData?.map((actor, index) => (
                            <li key={index}>
                                <Link>
                                    {actor.actor}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className={cx('wrap-top-search')}>
                <Topic mw0 content='Top Tìm kiếm' icon={<FontAwesomeIcon icon={faCrown} />} />
                <ul className={cx('top-search-list')}>
                    {
                        searchData?.map((search, index) => (
                            <li key={index}>
                                <Link>
                                    {search.value}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default BottmBody;
