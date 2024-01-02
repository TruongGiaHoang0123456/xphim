import React from "react";
import { useEffect, useState, memo } from 'react'
import classNames from 'classnames/bind';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from './HomePageItems.module.scss'
import { settings } from './component/settings'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

let cx = classNames.bind(styles);

const ReactSlick = () => {
    // data
    const [data, setData] = useState()

    useEffect(() => {
        async function getUser() {
            try {
                const response1 = await axios.get(`http://localhost:4000/filter/top-film/day`, {
                    params: {
                        limit: 10
                    }
                });
                setData(response1.data)

                if (response1.data.length < 10) {
                    const response2 = await axios.get(`http://localhost:4000/filter/top-film/week`, {
                        params: {
                            limit: 10
                        }
                    });
                    setData(response2.data)

                    if (response2.data.length < 10) {
                        const response3 = await axios.get(`http://localhost:4000/filter/top-film/month`, {
                            params: {
                                limit: 10
                            }
                        });
                        setData(response3.data)
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        getUser()

    }, [])

    return (
        <Slider className={cx('slider')} {...settings}>
            {data && data.map((item) => (
                <div key={item.id} className={cx('infor-movie')}>
                    <Link to={`/watch-movie/${item.slug}`} className={cx('container-img')}>
                        <img alt='avata' src={`${item.image}`} />
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
                </div>
            ))}
        </Slider>
    )
}

export default memo(ReactSlick);