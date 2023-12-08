import React from "react";
import { useEffect, useState, memo } from 'react'
import classNames from 'classnames/bind';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from './HomePageItems.module.scss'

let cx = classNames.bind(styles);

const settings = {
    dots: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    // infinite: true,
    responsive: [
        {
            breakpoint: 730,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 4,
            }
        }
    ]
};

const ReactSlick = () => {

    // data
    const [data, setData] = useState()

    useEffect(() => {

        const callApi = () => {
            async function getUser() {
                try {
                    const response = await axios.get('http://localhost:4000/films/views-film');

                    setData(response.data)
                } catch (error) {
                    console.error(error);
                }
            }
            getUser()
        }
        callApi()

        setInterval(() => {
            callApi()
        }, 604800000)
    }, [])

    return (
        <Slider className={cx('slider')} {...settings}>
            {data && data.map((item, index) => (
                <div key={index} className={cx('infor-movie')}>
                    <Link to={`/movie-information?filmId=${item.film_id}`} className={cx('container-img')}>
                        <img alt='avata' src={`${item.image}`} />
                        {item.oddFilmLength ?
                            <span>{item.oddFilmLength} phút</span>
                            :
                            <span>{item.maxEpisode || '??'}/{item.seriesFilmLength || '??'}</span>
                        }
                        <div className={cx('wrap-name')}>
                            <h3>{item.name}</h3>
                        </div >
                    </Link>
                </div>
            ))}
        </Slider>
    )
}

export default memo(ReactSlick);
