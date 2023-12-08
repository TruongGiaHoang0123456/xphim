import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPenFancy, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faComment, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';
import { memo } from 'react';
import axios from 'axios';

import Button from '../../components/Button';
import styles from './Comment.module.scss'
import AddComment from './CommentItems/WrapComment/AddComment';
import UpdateComment from './CommentItems/WrapComment/UpdateComment';
import PostTime from '../../components/PostTime'
import DeleteComment from './CommentItems/WrapComment/DeleteComment';
import AddRepComment from './CommentItems/WrapRepComment/AddRepComment';
import DeleteRepComment from './CommentItems/WrapRepComment/DeleteRepComment';
import UpdateRepComment from './CommentItems/WrapRepComment/UpdateRepComment';
import Lever from '../Lever/Lever';

let cx = classNames.bind(styles);

function Comment({ itemsPerPage = 5, url, url2, filmId, episode, userId }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [items, setItems] = useState([])

    // render rep comment
    const [repComment, setRepComment] = useState(false)

    // value editor rep comment
    const [valueUpdateRepComment, setValueUpdateRepComment] = useState('')

    // id rep comment where update rep comment
    const [commentRepId, setCommentRepId] = useState()

    const [showEditorComment, setShowEditorComment] = useState(false)

    // show block rep comment
    const [showBlockRepComment, setShowBlockRepComment] = useState()

    // value update comment
    const [valueUpdateComment, setValueUpdateComment] = useState('')

    // value rep comment
    const [valueRepComment, setValueRepComment] = useState('')

    // rerender
    const [rerender, setRerender] = useState(false)

    // commentId
    const [commentId, setCommentId] = useState()

    // content comment editor
    const [showBlockUpdateComment, setShowBlockUpdateComment] = useState(false)

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        async function getUser() {
            try {
                const response = axios.get(`${url}`);
                const response2 = axios.get(`${url2}`);

                Promise.all([response, response2]).then(([response, response2]) => {

                    setItems(response.data)
                    setRepComment(response2.data)
                })
            } catch (error) {
                console.error(error);
            }
        }
        getUser()
    }, [rerender, url, url2])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };


    return (
        <div className={cx('comment-section')}>
            <div className={cx('icons')}>
                <div className={cx('icon-comment')}>
                    <FontAwesomeIcon icon={faComment} />
                    {items && <span>Bình luận ({items.length})</span>}
                </div>
                <div className={cx('icon-load')}>
                    <FontAwesomeIcon icon={faRotateLeft} />
                </div>
            </div>
            <div className={cx('log-in')}>
                {userId ?
                    (<AddComment
                        rerender={rerender}
                        setRerender={setRerender}
                        filmId={filmId}
                        episode={episode}
                        userId={userId}
                    />)
                    :
                    <Button to='/log-in' content='Đăng nhập để bình luận' />
                }

                {/* content comment editor */}
                {showBlockUpdateComment &&
                    <UpdateComment
                        setShowBlockUpdateComment={setShowBlockUpdateComment}
                        commentId={commentId}
                        setValueUpdateComment={setValueUpdateComment}
                        valueUpdateComment={valueUpdateComment}
                        rerender={rerender}
                        setRerender={setRerender}
                    />
                }
            </div>

            <div className={cx('wrap-comment')}>
                {currentItems &&
                    currentItems.map((item, index) => (
                        <div key={index} >
                            <div className={cx('comment')}>
                                <div className={cx('logo')}>
                                    <img alt='avata' src={`https://i.ytimg.com/vi/${item.avatar}/mqdefault.jpg`} />
                                </div>
                                <div className={cx('wrap-user-name')}>
                                    <div className={cx('infor-user-name')}>
                                        <div className={cx('before')}>
                                            <span className={cx('user-name')}>{item.name}</span>
                                            <span className={cx('level')}>{Lever(item.level)}</span>
                                        </div>
                                        {userId === item.userId &&
                                            (<div className={cx('editor-comment')}>
                                                {
                                                    (showEditorComment === item.id ?
                                                        <div className={cx('after')}>
                                                            <FontAwesomeIcon className={cx('icon')} onClick={() => {
                                                                setShowEditorComment(false)
                                                            }} icon={faXmark} />

                                                            <div className={cx('editor')}>
                                                                <div

                                                                    onClick={() => {
                                                                        setShowBlockUpdateComment(true)
                                                                        setCommentId(item.id)
                                                                        setValueUpdateComment(item.content)
                                                                    }}
                                                                >

                                                                    <FontAwesomeIcon icon={faPenFancy}
                                                                    />
                                                                    <span >Sửa</span>
                                                                </div>

                                                                <DeleteComment
                                                                    item={item}
                                                                />

                                                            </div>
                                                        </div>
                                                        :
                                                        <div className={cx('after')} onClick={() => {
                                                            setShowEditorComment(item.id)
                                                        }}>
                                                            <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
                                                        </div>
                                                    )
                                                }
                                            </div>)
                                        }
                                    </div>
                                    <p className={cx('description')}>
                                        {item.content}
                                    </p>
                                    <div className={cx('wrap-after')}>
                                        {userId && (!showBlockRepComment ?
                                            (<span className={cx('rep')}
                                                onClick={() => {
                                                    setShowBlockRepComment(item.id)
                                                    setValueRepComment(`@${item.name} `)
                                                }}>Trả lời</span>)
                                            :
                                            (<span className={cx('rep')}
                                                onClick={() => {
                                                    setShowBlockRepComment()
                                                }}>Trả lời</span>)
                                        )}
                                        <span className={cx('comment-time')}>{PostTime(item.time)}</span>
                                    </div>
                                </div>
                            </div>

                            {
                                repComment &&
                                (
                                    (
                                        <>
                                            {repComment.filter((itemRepComment, index) => {
                                                return itemRepComment.id_comment_film === item.id
                                            }).map((result, index) => {

                                                return (
                                                    <div className={cx('wrap-update-rep-comment')} key={index} >
                                                        {result.comment_rep_id !== commentRepId ?
                                                            <div className={cx('comment', 'rep-comment')}>
                                                                <div className={cx('logo')}>
                                                                    <img alt='avata' src={`https://i.ytimg.com/vi/${result.avatar}/mqdefault.jpg`} />
                                                                </div>
                                                                <div className={cx('wrap-user-name')}>
                                                                    <div className={cx('infor-user-name')}>
                                                                        <div className={cx('before')}>
                                                                            <span className={cx('user-name')}>{result.name}</span>
                                                                            <span className={cx('level')}>{Lever(result.level)}</span>
                                                                        </div>
                                                                        {userId === result.user_id &&
                                                                            (<div className={cx('editor-comment')}>
                                                                                {(showEditorComment === result.comment_rep_id ?
                                                                                    <div className={cx('after')}>
                                                                                        <FontAwesomeIcon className={cx('icon')} onClick={() => {
                                                                                            setShowEditorComment(false)
                                                                                        }} icon={faXmark} />

                                                                                        <div className={cx('editor')}>
                                                                                            <div

                                                                                                onClick={() => {

                                                                                                    setCommentRepId(result.comment_rep_id)
                                                                                                    setValueUpdateRepComment(result.content)
                                                                                                }}
                                                                                            >

                                                                                                <FontAwesomeIcon icon={faPenFancy}
                                                                                                />
                                                                                                <span >Sửa</span>
                                                                                            </div>

                                                                                            {/* delete rep comment */}
                                                                                            <DeleteRepComment result={result} rerender={rerender} setRerender={setRerender} />

                                                                                        </div>
                                                                                    </div>
                                                                                    :
                                                                                    <div className={cx('after')} onClick={() => {
                                                                                        setShowEditorComment(result.comment_rep_id)
                                                                                    }}>
                                                                                        <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
                                                                                    </div>)}
                                                                            </div>)
                                                                        }
                                                                    </div>
                                                                    <p className={cx('description')}>
                                                                        {result.content}
                                                                    </p>

                                                                    <div className={cx('wrap-after')}>
                                                                        {userId && (!showBlockRepComment
                                                                            ? (<span className={cx('rep')}
                                                                                onClick={() => {
                                                                                    setShowBlockRepComment(result.id_comment_film)
                                                                                    setValueRepComment(`@${result.name} `)
                                                                                }}>Trả lời</span>) :
                                                                            (<span className={cx('rep')}
                                                                                onClick={() => {
                                                                                    setShowBlockRepComment()
                                                                                }}>Trả lời</span>)
                                                                        )
                                                                        }
                                                                        <span className={cx('comment-time')}>{PostTime(result.time)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            <UpdateRepComment
                                                                rerender={rerender}
                                                                setRerender={setRerender}
                                                                valueUpdateRepComment={valueUpdateRepComment}
                                                                setValueUpdateRepComment={setValueUpdateRepComment}
                                                                setCommentRepId={setCommentRepId}
                                                                result={result}
                                                            />
                                                        }

                                                    </div>
                                                )
                                            })}
                                        </>
                                    )
                                )
                            }

                            {/* add rep comment */}
                            {item.id === showBlockRepComment &&
                                <AddRepComment
                                    userId={userId}
                                    setShowBlockRepComment={setShowBlockRepComment}
                                    item={item}
                                    rerender={rerender}
                                    setRerender={setRerender}
                                    valueRepComment={valueRepComment}
                                    setValueRepComment={setValueRepComment}
                                />
                            }
                        </div>
                    ))}

                <div className={cx('container-pagignate')}>
                    <ReactPaginate
                        breakLabel={false}
                        onPageChange={handlePageClick}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={4}
                        pageCount={pageCount}
                        previousLabel="<"
                        nextLabel={'>'}
                        renderOnZeroPageCount={null}
                        breakClassName={cx('break')}
                        containerClassName={cx('pagignate')}
                        pageClassName={cx('list')}
                        previousClassName={cx('previous')}
                        nextClassName={cx('next')}
                        activeClassName={cx('active')}
                        disabledLinkClassName={cx('disabled')}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Comment)