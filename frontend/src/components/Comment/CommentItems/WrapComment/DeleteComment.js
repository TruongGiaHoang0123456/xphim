import classNames from "classnames/bind"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react'
import axios from "axios"

import styles from '../CommentItems.module.scss'

const cx = classNames.bind(styles)

const DeleteComment = ({
    rerender, setRerender, item
}) => {

    // handle remote comment
    const handleRemoteComment = async (commentId) => {
        const defind = window.confirm('Bạn chắc chắn muốn xóa')

        if (!defind) {
            return;
        }

        try {
            const response = await axios.delete(`http://127.0.0.1:4000/users/remote-comment`, {
                data: {
                    commentId: commentId
                }
            })

            if (response.data === 'Delete comment sucessfully!') {
                setRerender(!rerender)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div
            onClick={() => {
                handleRemoteComment(item.id)
            }}
        >
            <FontAwesomeIcon icon={faDeleteLeft} />
            <span>Xóa</span>
        </div>
    )
}

export default memo(DeleteComment)