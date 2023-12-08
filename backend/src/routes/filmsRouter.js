import express from 'express'
import FilmsControllers from '../controllers/FilmsControllers'

const router = express.Router()

const filmsRouter = () => {
    // get
    router.get('/list-film', FilmsControllers.listFilm)
    router.get('/infor-film', FilmsControllers.inforFilm)
    router.get('/watch-film/:filmName/:episode', FilmsControllers.watchFilm)
    router.get('/comment-film', FilmsControllers.commentFilm)
    router.get('/rep-comment', FilmsControllers.repComment)
    router.get('/comment-episode-film/:id/:episode', FilmsControllers.commentEpisodeFilm)
    router.get('/rep-episode-comment/:id/:episode', FilmsControllers.repEpisodeComment)
    router.get('/filter-film/filtered-film', FilmsControllers.filteredFilm)
    router.get('/filter-film/filter-list', FilmsControllers.filterList)
    router.get('/views-film', FilmsControllers.viewsFilm)
    router.get('/search-film', FilmsControllers.searchFilm)

    // post
    router.post('/add-views-film', FilmsControllers.addViewsFilm)

    return router
}

export default filmsRouter