import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../components/Button';
import WrapComponentEmpty from '../../components/WrapComponentEmpty/WrapComponentEmpty'
import styles from './FilterMoviePage.module.scss';
import Topic from '../../components/Topic/Topic';
import { faChevronDown, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import Paginate from '../../components/Paginate/Paginate';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginSection from '../../components/LoginSection/LoginSection';
import { useSelector } from 'react-redux';

let cx = classNames.bind(styles);


function FilterMoviePage() {

  // use selector
  const inforUsers = useSelector(state => (state.user.value))

  // initial filter
  const params = new URLSearchParams(document.location.search);
  const genreQuery = params.get("genre");
  const yearQuery = params.get("year");
  const genre = genreQuery && [`${genreQuery}`]
  const year = yearQuery && [+yearQuery]

  const [showGenre, setShowGenre] = useState(false)
  const [showYear, setShowYear] = useState(false)
  const [showMinEpisodes, setShowMinEpisodes] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [buttonFilter, setButtonFilter] = useState(() => {
    return genre || year || undefined
  })

  // api render data
  const [data, setData] = useState()
  const [query, setQuery] = useState(() => {
    return {
      genres: genre || undefined,
      years: year || undefined,
      minEpisode: undefined,
      status: undefined
    }
  })

  // api render filter
  const [filter, setFilter] = useState()
  const [genres, setGenres] = useState(() => {
    return genre || []
  })
  const [years, setYears] = useState(() => {
    return year || []
  })
  const [status, setStatus] = useState()
  const [minEpisode, setMinEpisode] = useState()



  // render data
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/films/filter-film/filtered-film`, {
          params: query
        });
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [query])

  // render filter
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/films/filter-film/filter-list`)
        setFilter(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [])

  const handleAddGenres = (genreFilm) => {
    if (genres.includes(genreFilm)) {
      const result = genres.filter((genre) => {
        return genre !== genreFilm
      })
      setGenres(result)
    } else {
      setGenres([...genres, genreFilm])
    }
  }

  const handleAddYears = (year) => {
    if (years.includes(year)) {
      const result = years.filter((genre) => {
        return genre !== year
      })
      setYears(result)
    } else {
      setYears([...years, year])
    }
  }

  const handleMinEpisode = (episode) => {
    if (episode === 'Full') {
      minEpisode === null ? setMinEpisode(undefined) : setMinEpisode(null)
    } else {
      episode === minEpisode ? setMinEpisode(undefined) : setMinEpisode(episode)
    }
  }

  const handleInforFilter = () => {
    setQuery((pre) => {
      setShowGenre(false)
      setShowYear(false)
      setShowMinEpisodes(false)
      setShowStatus(false)

      const listGenres = genres.length === 0 ? undefined : genres
      const listYears = years.length === 0 ? undefined : years

      setButtonFilter(() => {
        const arr = []
        let statusContent
        if (status === '1') {
          statusContent = 'Hoàn thành'
          arr.push(statusContent)
        } else if (status === '0') {
          statusContent = 'Đang tiến hành'
          arr.push(statusContent)
        } else {
          statusContent = undefined
        }

        if (genres.length !== 0)
          arr.push(...genres)

        if (years.length !== 0)
          arr.push(...years)

        if (minEpisode === null) {
          const full = 'Full'
          arr.push(full)
        } else if (minEpisode !== undefined) {
          arr.push(minEpisode)
        }

        return arr
      })

      return {
        genres: listGenres,
        years: listYears,
        minEpisode: minEpisode,
        status: status
      }
    })
  }

  const handleRemovedButtonFilter = (item) => {
    genres.includes(item) && handleAddGenres(item)
    years.includes(item) && handleAddYears(item)
    minEpisode === item && handleMinEpisode(item)
    status === '0' && setStatus(undefined)
    status === '1' && setStatus(undefined)

    setButtonFilter((pre) => {
      return pre.filter(pre => (
        pre !== item
      ))
    })

    setQuery((query) => {
      let genres;
      let years;
      let minEpisode;
      let status;

      // genres
      if (query.genres) {
        if (query.genres.includes(item)) {
          genres = query.genres.filter((genre) => (
            genre !== item
          ))
        } else {
          genres = query.genres
        }
      }

      // years
      if (query.years) {
        if (query.years.includes(item)) {
          years = query.years.filter((year) => (
            year !== item
          ))
        } else {
          years = query.years
        }
      }

      // min episode
      minEpisode = query.minEpisode === item ? query.minEpisode = undefined : query.minEpisode

      // status
      if (item === 'Đang tiến hành') {
        status = query.status = undefined
      } else if (item === 'Hoàn thành') {
        status = query.status = undefined
      }

      return {
        genres,
        years,
        minEpisode,
        status,
      }
    })
  }

  const handleShowGenre = () => {
    if (showGenre === false) {
      setShowGenre(true)
    } else {
      setShowGenre(false)
    }
  }

  const handleShowYear = () => {
    if (showYear === false) {
      setShowYear(true)
    } else {
      setShowYear(false)
    }
  }

  const handleShowMinEpisodes = () => {
    if (showMinEpisodes === false) {
      setShowMinEpisodes(true)
    } else {
      setShowMinEpisodes(false)
    }
  }

  const handleShowStatus = () => {
    if (showStatus === false) {
      setShowStatus(true)
    } else {
      setShowStatus(false)
    }
  }

  return (
    <div className={cx('filter-movie')}>

      {/* login section */}
      {inforUsers && <LoginSection />}

      {/* Topic */}
      <Topic content='Trang lọc phim' />

      {/* filter */}
      <div className={cx('filter')}>
        <div className={cx('before')}>
          <div
            onClick={
              handleShowGenre
            }
            style={showGenre === true ? { 'backgroundColor': 'rgb(58, 121, 175)' } : {}}
          >
            <span>Thể loại</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div
            onClick={handleShowYear}
            style={showYear === true ? { 'backgroundColor': 'rgb(58, 121, 175)' } : {}}
          >
            <span>Năm</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>

          <div
            onClick={handleShowMinEpisodes}
            style={showMinEpisodes === true ? { 'backgroundColor': 'rgb(58, 121, 175)' } : {}}
          >
            <span>Số tập</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>

          <div
            onClick={handleShowStatus}
            style={showStatus === true ? { 'backgroundColor': 'rgb(58, 121, 175)' } : {}}
          >
            <span>Trạng thái</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

        {(showGenre || showYear || showMinEpisodes || showStatus) && <div className={cx('after')}>

          {/* movie genre */}
          {/* {showGenre && <div className={cx('option')}>
            <div className={cx('content')}>Thể loại</div>
            <div className={cx('movie-genre')}>
              {filter && filter.genres.map((item, index) => (
                <Link key={index}
                  to='/filter-movie'
                  style={genres.includes(item.genre) ? { 'backgroundColor': '#3a79af' } : {}}
                  onClick={() => { handleAddGenres(item.genre) }}
                >
                  {item.genre}
                </Link>
              ))}
            </div >
          </div>} */}

          {/* year */}
          {/* {showYear && <div className={cx('option')}>
            <div className={cx('content')}>Năm phát hành</div>
            <div className={cx('movie-genre')}>
              {filter && filter.years.map((item, index) => (
                <Link
                  to='/filter-movie'
                  key={index}
                  onClick={() => {
                    handleAddYears(item.year)
                  }}
                  style={years.includes(item.year) ? { 'backgroundColor': '#3a79af' } : {}}
                >
                  {item.year}
                </Link>
              ))}
            </div>
          </div>} */}

          {/* episodes */}
          {/* {showMinEpisodes && <div className={cx('option')}>
            <div className={cx('content')}>Số tập ít nhất</div>
            <div className={cx('movie-genre')}>
              <button
                onClick={(e) => {
                  const value = e.target.value
                  handleMinEpisode(value)
                }}
                style={minEpisode === null ? { 'backgroundColor': '#3a79af' } : {}}
                value='Full'
              >
                Full
              </button>

              <button
                onClick={(e) => {
                  const value = e.target.value
                  handleMinEpisode(value)
                }}
                style={minEpisode === '500' ? { 'backgroundColor': '#3a79af' } : {}}
                value='500'
              >
                500
              </button>

              <button
                onClick={(e) => {
                  const value = e.target.value
                  handleMinEpisode(value)
                }}
                style={minEpisode === '200' ? { 'backgroundColor': '#3a79af' } : {}}
                value='200'
              >
                200
              </button>

              <button
                onClick={(e) => {
                  const value = e.target.value
                  handleMinEpisode(value)
                }}
                style={minEpisode === '100' ? { 'backgroundColor': '#3a79af' } : {}}
                value='100'
              >
                100
              </button>

              <button
                onClick={(e) => {
                  const value = e.target.value
                  handleMinEpisode(value)
                }}
                style={minEpisode === '12' ? { 'backgroundColor': '#3a79af' } : {}}
                value='12'
              >
                12
              </button>

              <button
                onClick={(e) => {
                  const value = e.target.value
                  handleMinEpisode(value)
                }}
                style={minEpisode === '6' ? { 'backgroundColor': '#3a79af' } : {}}
                value='6'
              >
                6
              </button>

              <button
                onClick={(e) => {
                  const value = e.target.value
                  handleMinEpisode(value)
                }}
                style={minEpisode === '4' ? { 'backgroundColor': '#3a79af' } : {}}
                value='4'
              >
                4
              </button>
            </div>
          </div>} */}

          {/* status */}
          {/* {showStatus && <div className={cx('option')}>
            <div className={cx('content')}>Trạng thái</div>
            <div className={cx('movie-genre')}>
              <Link
                to='/filter-movie'
                style={status === '0' ? { 'backgroundColor': '#3a79af' } : {}}
                onClick={() => {
                  status === '0' ? setStatus(undefined) : setStatus('0')
                }}
              >
                Đang tiến hành
              </Link>

              <Link
                to='/filter-movie'
                style={status === '1' ? { 'backgroundColor': '#3a79af' } : {}}
                onClick={() => {
                  status === '1' ? setStatus(undefined) : setStatus('1')
                }}
              >
                Hoàn thành</
              Link>
            </div>
          </div>} */}

          {/* button-filter */}
          {/* <button className={cx('button-filter')} onClick={handleInforFilter} >
            <FontAwesomeIcon icon={faFilter} />
            <span>Lọc</span>
          </button> */}
        </div >}
      </div >

      {/* button-filter */}
      <div className={cx('button-filter')}>
        {buttonFilter && buttonFilter.map((item, index) => (
          <button key={index}>
            <span>{item}</span>
            <FontAwesomeIcon
              onClick={() => {
                handleRemovedButtonFilter(item)
              }}
              icon={faXmark}
            />
          </button>
        ))}
      </div>

      {/* Paginate */}

      {data && <Paginate items={data} />}


      {/* read-story */}

      <WrapComponentEmpty>
        <Button content='Đọc truyện chữ' border={false} />
      </WrapComponentEmpty>

    </div >
  );
}

export default FilterMoviePage;
