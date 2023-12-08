import classNames from "classnames/bind"
import { memo } from 'react'
import axios from "axios"

import styles from '../CommentItems.module.scss'
import Emoji from "../../../Emoji"

const cx = classNames.bind(styles)

const UpdateComment = ({
    rerender, setRerender, setShowBlockUpdateComment, commentId, valueUpdateComment, setValueUpdateComment
}) => {

    // handle update comment
    const handleUpdateComment = (commentId) => {
        if (valueUpdateComment.length === 0)
            return alert('Chưa nhập bình luận')

        async function getUser() {
            try {
                const response = await axios.put(`http://localhost:4000/users/change-comment`, {
                    commentId: commentId,
                    content: valueUpdateComment,
                })

                if (response.data === 'Update comment sucessfully!') {
                    alert(response.data)
                    setShowBlockUpdateComment(false)
                    setRerender(!rerender)
                }

            } catch (error) {
                console.error(error);
            }
        }
        getUser()

    }

    return (
        <div className={cx('update-comment')}>
            <textarea
                value={valueUpdateComment}
                onChange={e => {
                    setValueUpdateComment(e.target.value)

                }}
                spellCheck={false} placeholder='Nhập bình luận của bạn tại đây'
            />
            <div className={cx('bar-update-content')}>
                <span className={cx('before')}>
                    <Emoji setInputValue={setValueUpdateComment} />
                </span>
                <div className={cx('after')}>
                    <span className={cx('cancel')}
                        onClick={() => {
                            setShowBlockUpdateComment(false)
                        }}
                    >
                        Hủy
                    </span>

                    <span className={cx('save')} onClick={() => {
                        handleUpdateComment(commentId)
                    }}>
                        Lưu
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(UpdateComment)