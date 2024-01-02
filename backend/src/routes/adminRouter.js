import express from 'express'
import AdminControllers from '../controllers/AdminControllers'

const router = express.Router()


const usersRouter = () => {
    // get
    router.get('/search-film', AdminControllers.searchFilm)
    router.get('/check-token', AdminControllers.checkToken)
    router.get('/get-error', AdminControllers.getError)
    router.get('/detail-error/:id', AdminControllers.detailError)
    router.get('/all-error', AdminControllers.allError)

    // post
    router.post('/log-in', AdminControllers.login)
    router.post('/add-film', AdminControllers.addFilm)
    router.post('/add-genre', AdminControllers.addGenre)
    router.post('/add-actor', AdminControllers.addActor)
    router.post('/add-country', AdminControllers.addCountry)
    router.post('/add-error', AdminControllers.addError)

    // put
    router.put('/update-password', AdminControllers.updatePassword)
    router.put('/update-genre', AdminControllers.updateGenre)
    router.put('/update-actor', AdminControllers.updateActor)
    router.put('/update-country', AdminControllers.updateCountry)
    router.put('/update-films', AdminControllers.updateFilms)
    router.put('/update-isread-error/:idParams', AdminControllers.updateIsReadError)

    // delete
    router.delete('/delete-films/:id', AdminControllers.deleteFilm)
    router.delete('/delete-genre', AdminControllers.deleteGenre)
    router.delete('/delete-actor', AdminControllers.deleteActor)
    router.delete('/delete-country', AdminControllers.deleteCountry)
    router.delete('/delete-notify-error/:idParams', AdminControllers.deleteNotifyError)

    return router
}

export default usersRouter