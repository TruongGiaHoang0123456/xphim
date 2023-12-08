
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useSelector } from 'react-redux';


import styles from './MovieInformationPageItems.module.scss';
import { useEffect, useState } from 'react';
import LoginSection from '../../../components/LoginSection/LoginSection';

let cx = classNames.bind(styles);

const FilmReview = ({ displayMsg }) => {
    const [listEvaluate, setListEvaluate] = useState()

    // use selector
    const inforUsers = useSelector(state => (state.user.value))

    useEffect(() => {
        const getData = async function () {
            try {
                const response = await axios.get(`http://127.0.0.1:4000/users/list-evaluate`);
                setListEvaluate(response.data)

            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])

    const handleClick = (id) => {
        if (!inforUsers)
            displayMsg('toastLogin')
        else {
            const getData = async function () {
                try {
                    const searchParams = new URLSearchParams(window.location.search)

                    console.log('filmId', searchParams.get('filmId'))

                    const response = await axios.post(`http://127.0.0.1:4000/users/add-evaluate`, {
                        userId: inforUsers.id,
                        filmId: searchParams.get('filmId'),
                        evaluateId: id
                    });

                    if (response.data === 'Add evaluate Sucess') {
                        displayMsg('addEvaluate')
                        window.location.href = `/movie-information?filmId=${searchParams.get('filmId')}`
                    }
                    else if (response.data === 'Update evaluate Sucess') {
                        displayMsg('updateEvaluate')
                        window.location.href = `/movie-information?filmId=${searchParams.get('filmId')}`
                    }



                } catch (error) {
                    console.error(error);
                }
            }
            getData()
        }
    }

    return (
        <div className={cx('second')}>

            {/* login section */}
            {inforUsers && <LoginSection />}

            {listEvaluate && listEvaluate.map((item, index) => (
                <div key={index} className={cx('icon')} onClick={() => {
                    handleClick(item.id)
                }} star={item.id}>
                    <FontAwesomeIcon icon={faStar} />
                </div>
            ))}
        </div>
    )
}

export default FilmReview