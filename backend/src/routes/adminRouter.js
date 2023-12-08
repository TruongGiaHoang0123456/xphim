import express from 'express'
import AdminControllers from '../controllers/AdminControllers'

const router = express.Router()


const usersRouter = () => {
    // get
    router.get('/render-page-add-film', AdminControllers.renderPageAddFilmm)

    // post
    router.post('/add-film', AdminControllers.addFilm)
    router.post('/add-episode-film', AdminControllers.addEpisodeFilm)

    // put

    // delete

    return router
}

export default usersRouter