import classNames from "classnames/bind"
import styles from './FilterMoviePage.module.scss'
import Topic from "../../components/Topic/Topic"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { updateActor, updateCountry, updateData, updateGenres, updateTopMovie } from "../../reducer/filterSlice"
import Paginate from "../../components/Paginate/Paginate"

const cx = classNames.bind(styles)

const FilterMoviePage = () => {

  const [genres, setGenres] = useState()
  const [actors, setActors] = useState()
  const [countrys, setCountrys] = useState()

  const data = useSelector((state) => state.filter.data)

  const dispatch = useDispatch()

  // select genres
  const selectGenres = useSelector((state) => state.filter.selectGenres)
  // select genres
  const selectActor = useSelector((state) => state.filter.selectActor)
  // select genres
  const selectCountry = useSelector((state) => state.filter.selectCountry)
  // select genres
  const selectTopMovie = useSelector((state) => state.filter.selectTopMovie)


  useEffect(() => {
    async function getUser() {
      try {
        const genres = await axios.get('http://localhost:4000/films/genres-film');
        const actors = await axios.get('http://localhost:4000/films/actors-film');
        const countrys = await axios.get('http://localhost:4000/films/countrys-film');

        Promise.all([genres, actors, countrys]).then(([genres, actors, countrys]) => {
          setGenres(genres.data)
          setActors(actors.data)
          setCountrys(countrys.data)
        })
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [])

  const handleSelectGenres = (value) => {
    dispatch(updateGenres(value))
  }

  const handleFilterMovie = () => {
    const result = {
      genres: selectGenres,
      actor: selectActor,
      country: selectCountry,
      topMovie: selectTopMovie
    }

    // non select
    const nonSelectGenres = result.genres.length === 0
    const nonSelectActor = result.actor === ''
    const nonSelectCountry = result.country === ''
    const nonSelectTopMovie = result.topMovie === ''

    // has select 
    const hasSelectGenres = result.genres.length !== 0
    const hasSelectActor = result.actor !== ''
    const hasSelectCountry = result.country !== ''
    const hasSelectTopMovie = result.topMovie !== ''

    // filter
    switch (true) {
      // filter one
      // filter genres
      case nonSelectActor && nonSelectCountry && nonSelectTopMovie && hasSelectGenres:

        async function selectGenres() {
          try {
            const response = await axios.get('http://localhost:4000/filter/select-genres', {
              params: {
                genres: result.genres
              }
            });

            dispatch(updateData(response.data))
          } catch (error) {
            console.error(error);
          }
        }
        selectGenres()
        break;
      // filter actor
      case nonSelectGenres && nonSelectCountry && nonSelectTopMovie && hasSelectActor:
        async function selectActor() {
          try {
            const response = await axios.get(`http://localhost:4000/filter/select-actor/${result.actor}`);

            dispatch(updateData(response.data))
          } catch (error) {
            console.error(error);
          }
        }
        selectActor()
        break;
      // filter country
      case nonSelectGenres && nonSelectActor && nonSelectTopMovie && hasSelectCountry:
        async function selectCountry() {
          try {
            const response = await axios.get(`http://localhost:4000/filter/select-country/${result.country}`);

            dispatch(updateData(response.data))
          } catch (error) {
            console.error(error);
          }
        }
        selectCountry()
        break;
      // filter top-movie
      case nonSelectGenres && nonSelectActor && nonSelectCountry && hasSelectTopMovie:
        switch (result.topMovie) {
          case 'Ngày cập nhật':
            async function selectDateCreate() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-top-movie/day-created`);

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectDateCreate()
            break;
          case 'Lượt like':
            async function selectLikes() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-top-movie/likes`);

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectLikes()
            break;
          case 'Top all':
            async function selectTopAll() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-top-movie/all`);

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTopAll()
            break;
          case 'month':
          case 'week':
          case 'day':
            async function selectTop() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-top-movie/${result.topMovie}`);

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTop()
            break;
          default:
            console.log('sai')
        }
        break;
      // filter two
      // filter genres and actor
      case nonSelectCountry && nonSelectTopMovie && hasSelectGenres && hasSelectActor:
        async function selectGenresActor() {
          try {
            const response = await axios.get(`http://localhost:4000/filter/select-genres-actor`, {
              params: {
                genres: result.genres,
                actor: result.actor
              }
            });

            dispatch(updateData(response.data))
          } catch (error) {
            console.error(error);
          }
        }
        selectGenresActor()
        break;
      // filter genres and country
      case nonSelectActor && nonSelectTopMovie && hasSelectGenres && hasSelectCountry:
        async function selectGenresCountry() {
          try {
            const response = await axios.get(`http://localhost:4000/filter/select-genres-country`, {
              params: {
                genres: result.genres,
                country: result.country
              }
            });

            dispatch(updateData(response.data))
          } catch (error) {
            console.error(error);
          }
        }
        selectGenresCountry()
        break;
      // filter genres and top-movie
      case nonSelectActor && nonSelectCountry && hasSelectGenres && hasSelectTopMovie:
        switch (result.topMovie) {
          case 'Ngày cập nhật':
            async function selectDateCreate() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-day-created`, {
                  params: {
                    genres: result.genres
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectDateCreate()
            break;
          case 'Lượt like':
            async function selectLikes() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-like`, {
                  params: {
                    genres: result.genres
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectLikes()
            break;
          case 'Top all':
            async function selectTopAll() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-all`, {
                  params: {
                    genres: result.genres
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTopAll()
            break;
          case 'month':
          case 'week':
          case 'day':
            async function selectTop() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-top/${result.topMovie}`, {
                  params: {
                    genres: result.genres
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTop()
            break;
          default:
            console.log('sai')
        }
        break;
      // filter actor and country
      case nonSelectGenres && nonSelectTopMovie && hasSelectActor && hasSelectCountry:
        async function selectActorCountry() {
          try {
            const response = await axios.get(`http://localhost:4000/filter/select-actor-country`, {
              params: {
                actor: result.actor,
                country: result.country
              }
            });

            dispatch(updateData(response.data))
          } catch (error) {
            console.error(error);
          }
        }
        selectActorCountry()
        break;
      // filter actor and top-movie
      case nonSelectGenres && nonSelectCountry && hasSelectActor && hasSelectTopMovie:
        switch (result.topMovie) {
          case 'Ngày cập nhật':
            async function selectDateCreate() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-actor-day-created`, {
                  params: {
                    actor: result.actor
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectDateCreate()
            break;
          case 'Lượt like':
            async function selectLikes() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-actor-like`, {
                  params: {
                    actor: result.actor
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectLikes()
            break;
          case 'Top all':
            async function selectTopAll() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-actor-all`, {
                  params: {
                    actor: result.actor
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTopAll()
            break;
          case 'month':
          case 'week':
          case 'day':
            async function selectTop() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-actor-top`, {
                  params: {
                    actor: result.actor,
                    top: result.topMovie
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTop()
            break;
          default:
            console.log('sai')
        }
        break;
      // filter country and top-movie
      case nonSelectGenres && nonSelectActor && hasSelectCountry && hasSelectTopMovie:
        switch (result.topMovie) {
          case 'Ngày cập nhật':
            async function selectDateCreate() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-country-day-created`, {
                  params: {
                    country: result.country
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectDateCreate()
            break;
          case 'Lượt like':
            async function selectLikes() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-country-like`, {
                  params: {
                    country: result.country
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectLikes()
            break;
          case 'Top all':
            async function selectTopAll() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-country-all`, {
                  params: {
                    country: result.country
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTopAll()
            break;
          case 'month':
          case 'week':
          case 'day':
            async function selectTop() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-country-top`, {
                  params: {
                    country: result.country,
                    top: result.topMovie
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTop()
            break;
          default:
            console.log('sai')
        }
        break;
      // filter three
      // filter genres and actor and country
      case nonSelectTopMovie && hasSelectGenres && hasSelectActor && hasSelectCountry:
        async function selectGenresActorCountry() {
          try {
            const response = await axios.get(`http://localhost:4000/filter/select-genres-actor-country`, {
              params: {
                genres: result.genres,
                actor: result.actor,
                country: result.country,
              }
            });

            dispatch(updateData(response.data))
          } catch (error) {
            console.error(error);
          }
        }
        selectGenresActorCountry()
        break;
      // filter genres and actor and top-movie
      case nonSelectCountry && hasSelectGenres && hasSelectActor && hasSelectTopMovie:
        switch (result.topMovie) {
          case 'Ngày cập nhật':
            async function selectDateCreate() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-actor-day-created`, {
                  params: {
                    genres: result.genres,
                    actor: result.actor
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectDateCreate()
            break;
          case 'Lượt like':
            async function selectLikes() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-actor-like`, {
                  params: {
                    genres: result.genres,
                    actor: result.actor,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectLikes()
            break;
          case 'Top all':
            async function selectTopAll() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-actor-all`, {
                  params: {
                    genres: result.genres,
                    actor: result.actor,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTopAll()
            break;
          case 'month':
          case 'week':
          case 'day':
            async function selectTop() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-actor-top`, {
                  params: {
                    genres: result.genres,
                    actor: result.actor,
                    top: result.topMovie,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTop()
            break;
          default:
            console.log('sai')
        }
        break;
      // filter genres and country and top-movie
      case nonSelectActor && hasSelectGenres && hasSelectCountry && hasSelectTopMovie:
        switch (result.topMovie) {
          case 'Ngày cập nhật':
            async function selectDateCreate() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-country-day-created`, {
                  params: {
                    genres: result.genres,
                    country: result.country
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectDateCreate()
            break;
          case 'Lượt like':
            async function selectLikes() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-country-like`, {
                  params: {
                    genres: result.genres,
                    country: result.country,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectLikes()
            break;
          case 'Top all':
            async function selectTopAll() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-country-all`, {
                  params: {
                    genres: result.genres,
                    country: result.country,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTopAll()
            break;
          case 'month':
          case 'week':
          case 'day':
            async function selectTop() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-genres-country-top`, {
                  params: {
                    genres: result.genres,
                    country: result.country,
                    top: result.topMovie
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTop()
            break;
          default:
            console.log('sai')
        }
        break;
      // filter actor and country and top-movie
      case nonSelectGenres && hasSelectActor && hasSelectCountry && hasSelectTopMovie:
        switch (result.topMovie) {
          case 'Ngày cập nhật':
            async function selectDateCreate() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-actor-country-day-created`, {
                  params: {
                    actor: result.actor,
                    country: result.country
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectDateCreate()
            break;
          case 'Lượt like':
            async function selectLikes() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-actor-country-like`, {
                  params: {
                    actor: result.actor,
                    country: result.country,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectLikes()
            break;
          case 'Top all':
            async function selectTopAll() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-actor-country-all`, {
                  params: {
                    actor: result.actor,
                    country: result.country,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTopAll()
            break;
          case 'month':
          case 'week':
          case 'day':
            async function selectTop() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-actor-country-top`, {
                  params: {
                    actor: result.actor,
                    country: result.country,
                    top: result.topMovie
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTop()
            break;
          default:
            console.log('sai')
        }
        break;
      // filter four
      // filter genres and actor and country and top-movie
      case hasSelectGenres && hasSelectActor && hasSelectCountry && hasSelectTopMovie:
        switch (result.topMovie) {
          case 'Ngày cập nhật':
            async function selectDateCreate() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-all-day-created`, {
                  params: {
                    genres: result.genres,
                    actor: result.actor,
                    country: result.country,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectDateCreate()
            break;
          case 'Lượt like':
            async function selectLikes() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-all-like`, {
                  params: {
                    genres: result.genres,
                    actor: result.actor,
                    country: result.country,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectLikes()
            break;
          case 'Top all':
            async function selectTopAll() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-all-all`, {
                  params: {
                    genres: result.genres,
                    actor: result.actor,
                    country: result.country,
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTopAll()
            break;
          case 'month':
          case 'week':
          case 'day':
            async function selectTop() {
              try {
                const response = await axios.get(`http://localhost:4000/filter/select-all-top`, {
                  params: {
                    genres: result.genres,
                    actor: result.actor,
                    country: result.country,
                    top: result.topMovie
                  }
                });

                dispatch(updateData(response.data))
              } catch (error) {
                console.error(error);
              }
            }
            selectTop()
            break;
          default:
            console.log('sai')
        }
        break;
      default:
        console.log('end');
        async function nonSelect() {
          try {
            const response = await axios.get('http://localhost:4000/filter/non-select');
            dispatch(updateData(response.data))
          } catch (error) {
            console.error(error);
          }
        }
        nonSelect()
    }

  }

  return (
    <div className={cx('wrap-fliter-movie')}>
      <Topic content="Trang lọc phim" />

      <div className={cx('filter-movie')}>
        <div className={cx('filter-first')}>
          <span className={cx('filter-topic')}>Thể loại: </span>

          <ul className={`row ${cx('filter-genres-list')}`}>
            {genres?.map((genre) => {
              return (
                <li
                  className={`l-2-4 t-4 m-6 ${cx('filter-genres-item')}`}
                  key={genre.id}
                  style={selectGenres.includes(genre.genre) ?
                    { 'background': '#b73a3a' } : { 'background': 'unset' }
                  }
                  onClick={(e) => {
                    handleSelectGenres(genre.genre)
                  }}
                >
                  {genre.genre}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={`row ${cx('filter-second')}`}>
          <div className={`l-4 t-6 m-6 ${cx('menu')}`}>
            <span className={cx('filter-topic')}>Diễn viên: </span>

            <select value={selectActor} onChange={(e) => {
              dispatch(updateActor(e.target.value))
            }}
            >
              <option value='' >Chọn diễn viên</option>
              {actors?.map((actor) => (
                <option key={actor.id} value={actor.actor}>{actor.actor}</option>
              ))}
            </select>
          </div>

          <div className={`l-4 t-6 m-6 ${cx('menu')}`}>
            <span className={cx('filter-topic')}>Quốc gia: </span>

            <select value={selectCountry} onChange={(e) => {
              dispatch(updateCountry(e.target.value))
            }}>
              <option value=''>Chọn quốc gia</option>
              {countrys?.map(country => (
                <option key={country.id} value={country.country}>{country.country}</option>
              ))}
            </select>
          </div>

          <div className={`l-4 t-6 m-6 ${cx('menu', 'top-films')}`}>
            <span className={cx('filter-topic')}>Sắp xếp theo: </span>

            <select value={selectTopMovie} onChange={(e) => {
              dispatch(updateTopMovie(e.target.value))
            }}>
              <option value=''>Sắp xếp theo</option>
              <option value='Ngày cập nhật'>Ngày cập nhật</option>
              <option value='Lượt like'>Lượt like</option>
              <option value='Top all'>Lượt Xem</option>
              <option value='month'>Top tháng</option>
              <option value='week'>Top tuần</option>
              <option value='day'>Top ngày</option>
            </select>
          </div>
        </div>

        <button onClick={handleFilterMovie} className={cx('btn-filter')}>Lọc</button>
      </div>

      <div className={cx('wrap-film-filter')}>
        {data && <Paginate topic='Phim được lọc' topMovie={false} itemsPerPage={30} items={data} />}
      </div>

    </div>
  )
}

export default FilterMoviePage