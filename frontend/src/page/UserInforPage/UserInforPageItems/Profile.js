import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import styles from './UserInforPageItems.module.scss';
import { useState } from 'react';
import PostTime from '../../../components/PostTime/PostTime';
import Experience from '../../../components/Experience/Experience';
import FormUpdateAvatar from './FormUpdateAvatar'
import Layer from '../../../components/Layer';
import Lever from '../../../components/Lever/Lever';

let cx = classNames.bind(styles);

function Profile() {

    // infor film
    const inforUser = useSelector((state) => {
        return state.user.value
    })

    // show form update avatar
    const [showFormUpdateAvatar, setShowFormUpdateAvatar] = useState(false)
    return (
        <div className={cx('wrap-profile')}>

            <div className={cx('wrap-profile1')}>
                <div className={cx('avatar')}>
                    {inforUser && <img alt='avata' src={inforUser.avatar === null ? `https://i.ytimg.com/vi/idavatar/mqdefault.jpg` : inforUser.avatar} />}
                </div>

                {inforUser && <span>{Lever(inforUser.level)}</span>}

                <button
                    onClick={() => {
                        setShowFormUpdateAvatar(true)
                    }}
                >
                    Thay Avatar
                </button>
            </div>

            {showFormUpdateAvatar &&
                <Layer>
                    <FormUpdateAvatar setShowFormUpdateAvatar={setShowFormUpdateAvatar} />
                </Layer>
            }

            <div className={cx('wrap-profile2')}>
                <div className={cx('first')}>
                    <div>
                        <label>Biệt danh</label>
                        <input defaultValue={inforUser && inforUser.nickname} />
                    </div>

                    <div>
                        <label>Châm ngôn</label>
                        <input defaultValue={inforUser && inforUser.maxim} />
                    </div>
                </div>

                <div className={cx('second')}>
                    <div>
                        <span>Email</span>
                        <div>{inforUser && inforUser.email}</div>
                    </div>

                    <div>
                        <span>Ngày tham gia</span>
                        <div>{inforUser && PostTime(inforUser.registration_date)}</div>
                    </div>

                    <div>
                        <span>Kinh nghiệm</span>
                        <div>
                            {inforUser && Experience(inforUser.experience)}
                        </div>
                    </div>

                    <div>
                        <span>Tiền xu</span>
                        <div>
                            {inforUser && inforUser.coint}
                        </div>
                    </div>
                </div>

                <div className={cx('wrap-save')}>
                    <button>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                        <span>Lưu</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
