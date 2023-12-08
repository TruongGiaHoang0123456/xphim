import classNames from "classnames/bind"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react'
import axios from "axios"

import styles from '../CommentItems.module.scss'

const cx = classNames.bind(styles)

const DeleteRepComment = ({
    rerender, setRerender, result
}) => {

    // console.log('result', result)

    // handle remote rep comment
    const handleRemoteRepComment = async (commentRepId) => {
        const defind = window.confirm('Bạn chắc chắn muốn xóa')

        if (!defind) {
            return;
        }

        try {
            const response = await axios.delete(`http://127.0.0.1:4000/users/remote-rep-comment`, {
                data: {
                    id: commentRepId
                }
            })

            if (response.data === 'Delete rep comment sucessfully!') {
                setRerender(!rerender)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div
            onClick={() => {
                handleRemoteRepComment(result.comment_rep_id)
            }}
        >
            <FontAwesomeIcon icon={faDeleteLeft} />
            <span>Xóa</span>
        </div>
    )
}

export default memo(DeleteRepComment)