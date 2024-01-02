import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './SearchFilmPage.module.scss';
import Paginate from '../../components/Paginate/Paginate';
import { useLocation } from 'react-router-dom';

let cx = classNames.bind(styles);

function SearchFilmPage() {
  // searchValue
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const searchValue = urlSearch.get('searchValue');

  const [data, setData] = useState()

  useEffect(() => {

    async function getUser() {
      try {
        const response = await axios.get(`http://localhost:4000/films/search-film`, {
          params: {
            searchValue: searchValue
          }
        });

        if (response.data.length !== 0) {
          const addSearch = async function () {
            try {
              await axios.post(`http://localhost:4000/films/add-search`, {
                searchValue: searchValue
              })
            } catch (error) {
              console.error(error);
            }
          }
          addSearch()
        }

        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()

  }, [searchValue])

  return (
    <div>

      {/* second */}
      {data && <Paginate items={data} topic={`Tìm kiếm với từ khóa: ${searchValue}`} />}
    </div>
  )
}

export default SearchFilmPage;
