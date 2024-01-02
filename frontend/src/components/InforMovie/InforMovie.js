import classNames from 'classnames/bind';
import { Link } from "react-router-dom";

import styles from './InforMovie.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

let cx = classNames.bind(styles);


function InforMovie({
    src,
    onClick,
    likes,
    views,
    slug,
    name = '?????' }) {

    let props = {
        key: Math.ceil(Math.random() * 10000),
        onClick
    }

    return (
        <div {...props} className={cx('infor-movie-item')}>
            <Link to={`/watch-movie/${slug}`} className={cx('container-infor')}>
                <div className={cx('infor-wrap-img')}>
                    <img alt={`Ảnh anime ${name}`} src={`${src}`} />
                    <div className={cx('wrap-evaluate')}>
                        <div className={cx('wrap-view')}>
                            <FontAwesomeIcon icon={faEye} />
                            <span>
                                {views}
                            </span>
                        </div>
                        <div className={cx('wrap-like')}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>
                                {likes}
                            </span>
                        </div>
                    </div>
                </div>
                <h3 className={cx('infor-name')}>{name}</h3>
            </Link>
        </div>
    )
}

export default InforMovie;
