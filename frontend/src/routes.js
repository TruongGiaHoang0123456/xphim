// layout
import LayoutDefault from './layout/LayoutDefault/LayoutDefault';
import LayoutAdmin from './layout/LayoutAdmin/LayoutAdmin';
// page
import HomePage from './page/HomePage/HomePage'
import WatchMoviePage from './page/WatchMoviePage/WatchMoviePage'
import FilterMoviePage from './page/FilterMoviePage/FilterMoviePage'
import LogInPage from './page/LogInPage/LogInPage'
import UpdatePasswordPage from './page/UpdatePasswordPage/UpdatePasswordPage'
import SearchFilmPage from './page/SearchFilmPage/SearchFilmPage';
import NotFoundPage from './page/NotFoundPage/NotFoundPage';
import TestPage from './page/TestPage/TestPage'
// admin page

import ListFilmPage from './page/ListFilmPage/ListFilmPage';
import AddFilmPage from './page/AddFilmPage/AddFilmPage';
import AddGenrePage from './page/AddGenrePage/AddGenrePage';
import AddActorPage from './page/AddActorPage/AddActorPage';
import AddCountryPage from './page/AddCountryPage/AddCountryPage';
import DetailErrorPage from './page/DetailErrorPage/DetailErrorPage';
import AllErrorPage from './page/AllErrorPage/AllErrorPage';

const routes = [
    { path: '/', element: <LayoutDefault><HomePage /></LayoutDefault> },
    { path: '/watch-movie/:slug', element: <LayoutDefault><WatchMoviePage /></LayoutDefault> },
    { path: '/filter-movie', element: <LayoutDefault><FilterMoviePage /></LayoutDefault> },
    { path: '/admin/log-in', element: <LogInPage /> },
    { path: 'admin/update-password', element: <UpdatePasswordPage /> },
    { path: '/search-film', element: <LayoutDefault><SearchFilmPage /></LayoutDefault> },
    { path: '/admin/list-film', element: <LayoutAdmin><ListFilmPage /></LayoutAdmin> },
    { path: '/admin/add-film', element: <LayoutAdmin><AddFilmPage /></LayoutAdmin> },
    { path: '/admin/add-genre', element: <LayoutAdmin><AddGenrePage /></LayoutAdmin> },
    { path: '/admin/add-actor', element: <LayoutAdmin><AddActorPage /></LayoutAdmin> },
    { path: '/admin/add-country', element: <LayoutAdmin><AddCountryPage /></LayoutAdmin> },
    { path: '/admin/detail-error/:id', element: <LayoutAdmin><DetailErrorPage /></LayoutAdmin> },
    { path: '/admin/all-error', element: <LayoutAdmin><AllErrorPage /></LayoutAdmin> },
    { path: '/test', element: <TestPage /> },
    { path: '*', element: <NotFoundPage /> },
]

export default routes