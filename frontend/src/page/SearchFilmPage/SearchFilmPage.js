import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './SearchFilmPage.module.scss';
import Topic from '../../components/Topic'
import Button from '../../components/Button';
import WrapComponentEmpty from '../../components/WrapComponentEmpty/WrapComponentEmpty';
import Paginate from '../../components/Paginate';

let cx = classNames.bind(styles);

function SearchFilmPage() {
  // searchValue
  const [searchValue, setSearchValue] = useState(() => {
    const urlSearch = new URLSearchParams(window.location.search)

    return urlSearch.get('name')
  })

  const [data, setData] = useState()

  useEffect(() => {

    async function getUser() {
      try {
        const response = await axios.get(`http://localhost:4000/films/search-film`, {
          params: {
            name: searchValue
          }
        });

        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()

  }, [searchValue])

  return (
    <div>
      {/* Topic */}
      <Topic content={`Tìm kiếm với từ khóa: ${searchValue}`} />

      {/* second */}
      {data && <Paginate items={data} />}
    </div>
  )
}

export default SearchFilmPage;
