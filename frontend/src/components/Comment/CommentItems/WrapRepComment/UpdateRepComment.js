import classNames from "classnames/bind"
import { memo } from 'react'
import axios from "axios"

import styles from '../CommentItems.module.scss'
import Emoji from "../../../Emoji"

const cx = classNames.bind(styles)

const UpdateRepComment = ({
    rerender,
    setRerender,
    result,
    setCommentRepId,
    setValueUpdateRepComment,
    valueUpdateRepComment,
    setValueUpdateComment
}) => {

    // handle update rep comment
    const handleUpdateRepComment = (id, content) => {
        if (valueUpdateRepComment.length === 0)
            return alert('Chưa nhập bình luận')

        async function getUser() {
            try {
                const response = await axios.put(`http://localhost:4000/users/change-rep-comment`, {
                    id: id,
                    content: content,
                })

                if (response.data === 'Update rep comment sucessfully!') {
                    setCommentRepId()
                    setRerender(!rerender)
                }

            } catch (error) {
                console.error(error);
            }
        }
        getUser()

    }

    return (
        <div className={cx('update-rep-comment', 'update-rep-comment')}>
            <textarea
                value={valueUpdateRepComment}
                onChange={e => {
                    setValueUpdateRepComment(e.target.value)

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
                            setCommentRepId()
                        }}
                    >
                        Hủy
                    </span>
                    <span className={cx('save')} onClick={() => {
                        handleUpdateRepComment(result.comment_rep_id, valueUpdateRepComment)
                    }}>
                        Lưu
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(UpdateRepComment)