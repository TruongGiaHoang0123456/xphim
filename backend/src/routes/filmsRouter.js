import express from 'express'
import FilmsControllers from '../controllers/FilmsControllers'

const router = express.Router()

const filmsRouter = () => {
    /////////////////////multiple-api/////////////////////
    // get
    router.get('/genres-film', FilmsControllers.genresFilm)
    router.get('/list-film', FilmsControllers.listFilm)
    router.get('/actors-film', FilmsControllers.actorsFilm)
    router.get('/countrys-film', FilmsControllers.countrysFilm)


    /////////////////////only-api/////////////////////
    // get
    router.get('/watch-film/:slug', FilmsControllers.watchFilm)
    router.get('/filter-film/filtered-film', FilmsControllers.filteredFilm)
    router.get('/filter-film/filter-list', FilmsControllers.filterList)
    router.get('/search-film', FilmsControllers.searchFilm)
    router.get('/evaluate-film/:slug', FilmsControllers.evaluateFilm)

    // post
    router.post('/add-views-film', FilmsControllers.addViewsFilm)
    router.post('/add-search', FilmsControllers.addSearch)

    // put
    router.put('/update-add-like-film/:slug', FilmsControllers.updateAddLikeFilm)
    router.put('/update-add-dislike-film/:slug', FilmsControllers.updateAddDislikeFilm)

    return router
}

export default filmsRouter