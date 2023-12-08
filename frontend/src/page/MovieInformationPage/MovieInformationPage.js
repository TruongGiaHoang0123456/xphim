import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faFileCirclePlus, faFileExcel, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import styles from './MovieInformationPage.module.scss';
import Button from '../../components/Button';
import Comment from '../../components/Comment'
import FilmReview from './MovieInformationPageItems/FilmReview';
import LoginSection from '../../components/LoginSection/LoginSection';

let cx = classNames.bind(styles);

// min episode
let minEpisode = 1

export const MyContext = createContext()

function MovieInformationPage() {
  const [data, setData] = useState()
  const [followed, setFollowed] = useState([])
  const [test, setTest] = useState(true)

  // use selector
  const inforUsers = useSelector(state => (state.user.value))

  const functest = () => {
    setTest(!test)
  }

  const [query, setQuery] = useState(
    () => {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('filmId')
    }
  )

  // msg-toast
  const MsgToast = ({ content, color }) => (
    <div className={cx('msg-toast')}>
      <div style={{ 'borderBottomColor': color }} className={cx('notification')}>
        <div style={{ 'color': color }}>Thông báo</div>
        <span style={{ 'color': color }}>X</span>
      </div>
      <div className={cx('descript')}>{content}</div>
    </div>
  )

  // film-review
  const MsgFilmReview = () => (
    <div className={cx('film-review')}>
      <div className={cx('first')}>
        <div className={cx('words')}>Đánh giá phim</div>
      </div>
      <FilmReview displayMsg={displayMsg} />
    </div>
  )

  useEffect(() => {
    const getData = async function () {
      try {
        const response1 = axios.get(`http://127.0.0.1:4000/films/infor-film`, {
          params: {
            filmId: query
          }
        });

        const response2 = axios.get(`http://127.0.0.1:4000/users/followed-only-film`, {
          params: {
            filmId: query,
            userId: inforUsers === null ? null : inforUsers?.id
          }
        });


        Promise.all([response1, response2]).then(([response1, response2]) => {

          setData(response1.data)
          setFollowed(response2.data)
        })


      } catch (error) {
        console.error(error);
      }
    }
    getData()

  }, [query])

  // create displayMsg
  const displayMsg = (action) => {
    switch (action) {
      case 'addFollow':
        toast(<MsgToast content='Thêm theo dõi thành công' color='#c8c8ff' />);
        break;
      case 'addEvaluate':
        toast(<MsgToast content='Thêm đánh giá thành công' color='#c8c8ff' />);
        break;
      case 'removeFollow':
        toast(<MsgToast content='Xóa theo dõi thành công' color='#e85757' />);
        break;
      case 'updateEvaluate':
        toast(<MsgToast content='Cập nhật đánh giá thành công' color='#e85757' />);
        break;
      case 'toastLogin':
        toast(< MsgToast content='Bạn chưa đăng nhập' color='#5a5454' />, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
        break;
      case 'filmReview':
        toast(< MsgFilmReview />, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
          closeOnClick: false,
          className: cx('foo-bar'),
          closeButton: true
        });
        break;
      default:
        alert('dont pass action')
    }
  }

  // handle add follow
  const handleAddFollow = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:4000/users/add-follow`, {
        filmId: query,
        userId: inforUsers?.id === null ? 0 : inforUsers?.id
      })
      if (response.data === 'Sucess') {
        displayMsg('addFollow')
        setFollowed([response.data])
      }
    } catch (err) {
      console.log(err);
    }
  }

  // handle add follow
  const handleRemoteFollow = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:4000/users/remote-follow`, {
        data: {
          filmId: query,
          userId: inforUsers?.id === null ? 0 : inforUsers?.id

        }
      })

      if (response.data === 'Delete Sucess') {
        displayMsg('removeFollow')
        setFollowed([])
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={cx('movie-information')}>

      {/* login section */}
      {inforUsers && <LoginSection />}

      {/* infor-movie */}
      <div className={cx('wrap-infor-movie')}>
        <h2>{data?.infor_film?.name}</h2>
        <div className={cx('infor-movie')}>
          <div className={cx('img')}>
            <img alt='xin chao' src={data?.infor_film?.image} />
          </div>
          <div className={cx('wrap-row')}>
            <div className={cx('row')}>
              <div className={cx('column-1')}>Thể loại</div>
              <div className={cx('column-2')}>
                {data?.genres?.map((genre, index) => (
                  <button key={index}>{genre.genre}</button>
                ))}
              </div>
            </div>
            <div className={cx('row')}>
              <div className={cx('column-1')}>Trạng thái</div>
              <div className={cx('column-2')}>
                <span>{data?.infor_film?.number_episodes === +data?.max_current ? 'Đã hoàn thành' : 'Đang tiến hành'}</span>
              </div>
            </div>
            <div className={cx('row')}>
              <div className={cx('column-1')}>Điểm</div>
              <div className={cx('column-2')}>
                <span>
                  {(data?.medium_point !== undefined) ? data?.medium_point.avg : 0}
                  ||
                  {data?.medium_point !== undefined ? data?.medium_point.count : 0}
                  đánh giá
                </span>
              </div>
            </div>
            <div className={cx('row')}>
              <div className={cx('column-1')}>Phát hành
              </div>
              <div className={cx('column-2')}>
                <span>{data?.infor_film?.year}</span>
              </div>
            </div>
            <div className={cx('row')}>
              <div className={cx('column-1')}>Thời lượng
              </div>
              <div className={cx('column-2')}>
                {data && <span>{data?.infor_film?.movie_duration === null
                  ?
                  '??'
                  :
                  (data?.infor_film?.movie_duration)
                }</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* status-play */}

      <div className={cx('status-play')}>
        <div className={cx('before')}>
          {data && <Link
            to={`/watch-movie?id=${data?.infor_film?.film_id}&episode=${data.episode_film[data.episode_film?.length - 1]?.episode}`}
            style={{ 'background': '#25867d' }}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
            }}
            className={cx('play')}
          >
            <FontAwesomeIcon icon={faCirclePlay} />
          </Link>}
          {inforUsers ?
            (followed?.length === 0 ?
              (<div style={{ 'background': '#369e69' }} className={cx('play')} onClick={handleAddFollow}>
                <FontAwesomeIcon icon={faFileCirclePlus} />
              </div>)
              :
              (<div style={{ 'background': '#7d4848' }} className={cx('play')} onClick={handleRemoteFollow}>
                <FontAwesomeIcon icon={faFileExcel} />
              </div>))
            :
            (<div style={{ 'background': '#369e69' }} className={cx('play')} onClick={() => {
              displayMsg('toastLogin')
            }}>
              <FontAwesomeIcon icon={faFileCirclePlus} />
            </div>)
          }
          {/* ToastContainer */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            // autoClose={true}
            draggable
            pauseOnHover
            theme="dark"
            closeButton={false}
          />
        </div>
        <div className={cx('after')}
          style={{ 'background': '#369e69' }}
          onClick={() => { displayMsg('filmReview') }}
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
      </div>

      {/* part-of-movie */}
      {data?.related_film?.length !== 0 &&
        <div className={cx('part-of-movie')}>
          <h2>Phim liên quan</h2>

          <div className={cx('wrap-btn')}>
            {data?.related_film?.map((item, index) => (
              <div key={index}>

                <Link key={item?.related_film_link}
                  to={`/movie-information?filmId=${item?.related_film_link}`}
                  onClick={() => {
                    setQuery(item?.related_film_link)
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "auto",
                    });
                  }}
                >
                  {item?.related_part}
                </Link>
              </div>
            ))}
          </div>
        </div>
      }

      {/* wrap-content */}
      <div className={cx('wrap-content')}>
        <div className={cx('column-1')}>
          <span>Danh sách tập</span>
          <div>
            {data?.episode_film?.map((item, index) => {
              return (<Link
                key={index}
                to={`/watch-movie?id=${data?.infor_film?.film_id}&episode=${item.episode}`}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                }}
              >
                {
                  data?.infor_film?.number_episodes === 1 ?
                    'Full'
                    :
                    item.episode
                }
              </Link>)
            })}
          </div>
        </div>
        <div className={cx('column-2')}>
          <span>Nội dung</span>
          {data && <div>{data?.infor_film?.description}</div>}
        </div>
      </div>

      {/* comment-section */}
      <Comment
        url={`http://127.0.0.1:4000/films/comment-film?filmId=${query}`}
        url2={`http://127.0.0.1:4000/films/rep-comment?filmId=${query}`}
        filmId={query}
        userId={inforUsers?.id}
        episode={minEpisode}
      />

      {/* read stories */}
      <div className={cx('read-stories')}>
        <Link to='/'>
          <Button content='Đọc truyện chữ' border={false} />
        </Link>
      </div>
    </div >
  );
}

export default MovieInformationPage;
