import classNames from "classnames/bind"
import { useState, memo } from 'react'
import axios from "axios"

import styles from '../CommentItems.module.scss'
import Emoji from "../../../Emoji"

const cx = classNames.bind(styles)

const AddRepComment = ({
    rerender, setRerender, setShowBlockRepComment, item, userId, valueRepComment, setValueRepComment
}) => {

    // handle add rep comment
    const handleAddRepComment = (idCommentFilm) => {
        if (valueRepComment.length === 0)
            return alert('Chưa nhập bìnhh luận')

        async function getUser() {
            try {
                const response = await axios.post(`http://127.0.0.1:4000/users/add-rep-comment`, {
                    userId: userId,
                    content: valueRepComment,
                    idCommentFilm: idCommentFilm,
                });

                if (response.data === 'Add rep comment sucessfully!') {
                    console.log('xin chao');
                    setShowBlockRepComment()
                    setRerender(!rerender)
                }

            } catch (error) {
                console.error(error);
            }
        }
        getUser()

    }

    return (
        <div className={cx('add-rep-comment')}>
            <textarea
                value={valueRepComment}
                onChange={e => {
                    setValueRepComment(e.target.value)
                }}
                spellCheck={false} placeholder='Nhập bình luận của bạn tại đây'
            />
            <div className={cx('wrap-btn-send')}>
                <div className={cx('before')}>
                    <Emoji setInputValue={setValueRepComment} />
                </div>
                <div className={cx('after')}>
                    <span className={cx('send')} onClick={() => {
                        handleAddRepComment(item.id)
                    }}>
                        Gửi
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(AddRepComment)