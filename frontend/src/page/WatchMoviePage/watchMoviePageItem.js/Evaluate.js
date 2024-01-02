import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpRegular, faThumbsDown as faThumbsDownRegular } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';

import styles from './watchMoviePageItem.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

let cx = classNames.bind(styles);

const Evaluate = () => {

    const [data, setData] = useState()

    // is like
    const [like, setLike] = useState('REMOTE_LIKE')

    // is un like
    const [unLike, setUnLike] = useState('ADD_DISLIKE')
    let params = useParams()

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(`http://127.0.0.1:4000/films/evaluate-film/${params.slug}`)
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getUser()
    }, [like, unLike, params.slug])

    const handleLike = (status) => {
        async function getUser() {
            try {
                const response = await axios.put(`http://localhost:4000/films/update-add-like-film/${params.slug}`, {
                    status: status
                })

                if (response.data === ('update add like sucessfully!')) {
                    setLike('ADD_LIKE')
                } else if (response.data === ('update remote like sucessfully!')) {
                    setLike('REMOTE_LIKE')
                }

            } catch (error) {
                console.error(error);
            }
        }

        getUser()
    }

    const handleUnLike = (status) => {
        async function getUser() {
            try {
                const response = await axios.put(`http://localhost:4000/films/update-add-dislike-film/${params.slug}`, {
                    status: status
                })

                if (response.data === ('update add dislike sucessfully!')) {
                    setUnLike('REMOTE_DISLIKE')
                } else if (response.data === ('update remove dislike sucessfully!')) {
                    setUnLike('ADD_DISLIKE')
                }

            } catch (error) {
                console.error(error);
            }
        }

        getUser()
    }

    return (
        <div className={cx('wrap-evaluate')}>


            <button>
                <span>{data?.views}</span>
                <FontAwesomeIcon icon={faEye} />
            </button>

            {
                like === 'ADD_LIKE' ?
                    <button
                        onClick={() => {
                            handleLike('REMOTE_LIKE')
                        }}
                        style={
                            { 'background': '#b73a3a' }
                        }
                    >
                        <span>{data?.likes}</span>
                        <FontAwesomeIcon icon={faThumbsUpRegular} />
                    </button>
                    :
                    <button
                        onClick={() => {
                            handleLike('ADD_LIKE')
                        }}
                        style={
                            { 'background': '#252525' }
                        }
                    >
                        <span>{data?.likes}</span>
                        <FontAwesomeIcon icon={faThumbsUpRegular} />
                    </button>
            }

            {
                unLike === 'REMOTE_DISLIKE' ?
                    <button
                        onClick={() => {
                            handleUnLike('REMOTE_DISLIKE')
                        }}
                        style={
                            { 'background': '#b73a3a' }
                        }
                    >
                        <span>{data?.un_likes}</span>
                        <FontAwesomeIcon icon={faThumbsDownRegular} />
                    </button>
                    :
                    <button
                        onClick={() => {
                            handleUnLike('ADD_DISLIKE')
                        }}
                        style={
                            { 'background': '#252525' }
                        }
                    >
                        <span>{data?.un_likes}</span>
                        <FontAwesomeIcon icon={faThumbsDownRegular} />
                    </button>
            }
        </div>
    )
}

export default Evaluate