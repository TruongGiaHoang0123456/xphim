import classNames from "classnames/bind"
import { useState, memo } from 'react'
import axios from "axios"

import styles from '../CommentItems.module.scss'
import Emoji from "../../../Emoji"

const cx = classNames.bind(styles)

const AddComment = ({ rerender, setRerender, filmId, episode, userId }) => {

    // value comment
    const [valueComment, setValueComment] = useState('')

    // handle-add-comment
    const handleAddComment = () => {
        if (valueComment.length === 0)
            return alert('Chưa nhập bình luận')

        async function getUser() {
            try {
                const response = await axios.post(`http://127.0.0.1:4000/users/add-comment`, {
                    filmId: filmId,
                    userId: userId,
                    episode: episode,
                    content: valueComment
                });

                if (response.data === 'Add comment sucessfully!') {
                    alert(response.data)
                    setValueComment('')
                    setRerender(!rerender)
                }

            } catch (error) {
                console.error(error);
            }
        }
        getUser()

    }

    return (
        <div className={cx('add-comment')}>
            <textarea
                value={valueComment}
                onChange={e => {
                    setValueComment(e.target.value)
                }}
                spellCheck={false} placeholder='Nhập bình luận của bạn tại đây'
            />
            <div className={cx('wrap-btn-send')}>
                <div className={cx('before')}>
                    <Emoji setInputValue={setValueComment} />
                </div>
                <div className={cx('after')}>
                    <span className={cx('send')} onClick={handleAddComment}>
                        Gửi
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(AddComment)