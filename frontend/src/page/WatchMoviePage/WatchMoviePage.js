import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './WatchMoviePage.module.scss';
import { useEffect, useState } from 'react';
import TopMovie from '../../components/TopMovie/TopMovie';
import Topic from '../../components/Topic/Topic';
import { useParams } from 'react-router-dom/dist';
import InforMovie from '../../components/InforMovie/InforMovie';
import Evaluate from './watchMoviePageItem.js/Evaluate';
import BottmBody from '../../components/BottmBody/BottmBody';

let cx = classNames.bind(styles);

function WatchMoviePage({ match }) {
  const [data, setData] = useState('')

  const [showFormError, setShowFormError] = useState(false)

  const params = useParams()

  // server 
  const [server, setServer] = useState('server1')

  // error
  const [errorServer, setErrorServer] = useState('')
  const [errorDescript, setErrorDescript] = useState('')

  // expanded description
  const [isExpandedDescript, setIsExpandedDescript] = useState(false)

  useEffect(() => {

    const getData = async function () {
      try {
        const response = await axios.get(`http://localhost:4000/films/watch-film/${params.slug}`);

        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData()


    const addViews = async function () {
      try {
        await axios.post(`http://localhost:4000/films/add-views-film`, {
          slug: params.slug
        })
      } catch (error) {
        console.error(error);
      }
    }

    // add views of film
    const timeAddViews = setTimeout(addViews, 10000)

    return () => {
      clearTimeout(timeAddViews)
    }

  }, [params.slug])

  const handleSubmitError = () => {
    if (errorDescript.trim() === '' && errorServer === '') {
      return alert('Vui lòng chọn server bị lỗi hoặc mô tả nội dung lỗi')
    }

    const addError = async function () {
      try {
        const response = await axios.post(`http://localhost:4000/admin/add-error`, {
          errorServerValue: errorServer,
          errorDescriptValue: errorDescript,
          slug: params.slug,
        })

        if (response.data === 'Add error sucessfully!') {
          setShowFormError(false)
        }
      } catch (error) {
        console.error(error);
      }
    }
    addError()
  }

  return (

    <div className={cx('watch-movie')}>
      <div className={cx('movie-topic')}>
        <div className={cx('topic-name')}>
          <FontAwesomeIcon icon={faClapperboard} />
          <div>{data?.infor_film?.name}</div>
        </div>

        <div className={cx('topic-warning')}>
          <div
            tabIndex={0}
            onClick={() => {
              setShowFormError(!showFormError)
            }}
            className={cx('wrap-warning')}
          >
            <span>Báo lỗi</span>
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </div>

          {
            showFormError &&
            <div
              className={cx('form-error')}
            >
              <div className={cx('wrap-server')}>
                <label>Server</label>
                <select onChange={(e) => {
                  setErrorServer(e.target.value)
                }}>
                  <option value=''>Chọn Server</option>
                  <option value='server 1'>Server1</option>
                  <option value='server 2'>Server2</option>
                  <option value='cả 2'>Cả 2</option>
                </select>
              </div>

              <div className={cx('wrap-descript')}>
                <h3>Mô tả</h3>
                <textarea
                  spellCheck={false}
                  onChange={(e) => {
                    setErrorDescript(e.target.value)
                  }} value={errorDescript} placeholder='Lỗi...' />
              </div>

              <div className={cx('wrap-btn-submit')}>
                <button onClick={() => {
                  setShowFormError(false)
                }} className={cx('btn-submit')}>Hủy</button>

                <button onClick={handleSubmitError} className={cx('btn-submit', 'send')}>Gửi</button>

              </div>
            </div>
          }

          <div></div>

        </div>
      </div>

      <div className={`row ${cx('movie-wrap-video')}`}>
        <div className={`t-12 m-12 l-8-5 ${cx('column1')}`}>

          {/* video */}
          <div className={cx('video')} onClick={() => {
            console.log('xin chao');
          }} >
            {data && <iframe onClick={() => {
              console.log('xin chao2');
            }} allowFullScreen={true} frameBorder='0' src={data?.infor_film[server]} title={data?.infor_film.name} />}
          </div>

          {/* button-server */}
          <div className={cx('movie-wrap-button')}>
            <div className={cx('button-server')}>
              <button
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  })

                  setServer('server1')
                }}
                style={
                  server === 'server1' ?
                    { 'background': '#b73a3a', 'color': '#fff' }
                    :
                    { 'background': '#252525', 'color': '#fff' }
                }
              >
                Server 1
              </button>

              {
                data?.infor_film?.server2 &&
                <button onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  })

                  setServer('server2')
                }}
                  style={
                    server === 'server2' ?
                      { 'background': '#b73a3a', 'color': '#fff' }
                      :
                      { 'background': '#252525', 'color': '#fff' }
                  }
                >
                  Server 2
                </button>
              }

              {
                data?.infor_film?.server3 &&
                <button onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  })

                  setServer('server3')
                }
                }
                  style={
                    server === 'server3' ?
                      { 'background': '#b73a3a', 'color': '#fff' }
                      :
                      { 'background': '#252525', 'color': '#fff' }
                  }
                >
                  Server 3
                </button>
              }
            </div>

            <Evaluate />

          </div>

          < div className={cx('movie-wrap-infor')}
            style={
              isExpandedDescript ?
                { 'height': 'unset', 'overflow': 'unset' }
                :
                { 'height': '140px', 'overflow': 'hidden' }
            } >
            <div className={cx('infor-wrap-descript')}>
              <span>Mô tả:</span>
              <p>
                {data?.infor_film?.description}
              </p>

            </div>

            <div className={cx('infor-wrap-actors')}>
              <span className={cx('title')}>Diễn viên</span>
              {
                data?.infor_film?.actor ?
                  <Link className={cx('name')}>{data?.infor_film.actor}</Link>
                  :
                  <Link className={cx('name')}>Đang tiến hành</Link>
              }
            </div>

            {data?.infor_film?.genres.length !== 0 && <div className={cx('infor-wrap-genres')}>

              <span className={cx('title')}>Thể loại</span>
              <ul className={cx('list')}>
                {data?.infor_film?.genres.map(genre => (
                  <li key={genre.id} className={cx('item')}>
                    <Link>{genre.genre}</Link>
                  </li>
                ))}
              </ul>
            </div>}

            <div className={cx('infor-wrap-country')}>
              <span className={cx('title')}>Quốc gia</span>
              <Link className={cx('name')}>{data?.infor_film?.country}</Link>
            </div>
          </div >

          <div className={cx('toggle-expanded-descript')}>
            <button onClick={() => {
              setIsExpandedDescript(!isExpandedDescript)
            }}>
              {isExpandedDescript ? 'Thu gọn' : 'Mở rộng'}
            </button>

          </div>

          {data?.film_related?.length !== 0 &&
            <div className={cx('movie-wrap-fim-related')}>
              <Topic mw0={true} mh0={true} content='Phim liên quan' />

              <div className={`row ${cx('wrap-video')}`}>
                {data.film_related?.map((item) => (
                  <div key={item.id} className={`l-3 t-3 m-6 ${cx('video-item')}`}>
                    <InforMovie key={item.id}
                      src={item.image}
                      name={item.name}
                      slug={item.slug}
                      views={item.views}
                      likes={item.likes}
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                      }}
                    />
                  </div>
                ))}

              </div>
            </div>}

          {data?.film_nominated?.length !== 0 &&
            <div className={cx('movie-wrap-fim-favorite')}>
              <Topic mw0={true} mh0={true} content='Bạn có thể thích' />

              <div className={`row ${cx('wrap-video')}`}>

                {data.film_nominated?.map((item) => (
                  <div key={item.id} className={`m-6 t-3 l-3 ${cx('video-item')}`}>
                    <InforMovie key={item.id}
                      src={item.image}
                      name={item.name}
                      slug={item.slug}
                      views={item.views}
                      likes={item.likes}
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          }

          <div className={cx('wrap-top-movie')}>
            <BottmBody />
          </div>
        </div >

        <div className={`hide-on-m-t l-3-5 ${cx('column2')}`}>
          <TopMovie />
        </div>
      </div >
    </div >
  );
}

export default WatchMoviePage;
