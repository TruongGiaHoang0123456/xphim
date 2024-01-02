import express from 'express'
import FilmFilterController from '../controllers/FilmFilterController'

const router = express.Router()

const filmFilterRouter = () => {
    // select top month, week, day has limit
    router.get('/top-film/:top', FilmFilterController.topFilm)
    router.get('/top-all', FilmFilterController.topAll)
    router.get('/top-likes', FilmFilterController.topLikes)
    router.get('/top-Actors', FilmFilterController.topActors)
    router.get('/top-searchs', FilmFilterController.topSearchs)
    // none select
    router.get('/non-select', FilmFilterController.nonSelect)
    // select one
    router.get('/select-genres', FilmFilterController.selectGenres)
    router.get('/select-actor/:actor', FilmFilterController.selectActor)
    router.get('/select-country/:country', FilmFilterController.selectCountry)
    router.get('/select-top-movie/day-created', FilmFilterController.selectDayCreated)
    router.get('/select-top-movie/likes', FilmFilterController.selectLikes)
    router.get('/select-top-movie/all', FilmFilterController.selectAll)
    router.get('/select-top-movie/:top', FilmFilterController.selectTop)
    // select two
    router.get('/select-genres-actor', FilmFilterController.selectGenresActor)
    router.get('/select-genres-country', FilmFilterController.selectGenresCountry)
    router.get('/select-genres-day-created', FilmFilterController.selectGenresDayCreated)
    router.get('/select-genres-like', FilmFilterController.selectGenresLikes)
    router.get('/select-genres-all', FilmFilterController.selectGenresAll)
    router.get('/select-genres-top/:top', FilmFilterController.selectGenresTop)
    router.get('/select-actor-country', FilmFilterController.selectActorCountry)
    router.get('/select-actor-day-created', FilmFilterController.selectActorDayCreated)
    router.get('/select-actor-like', FilmFilterController.selectActorLike)
    router.get('/select-actor-all', FilmFilterController.selectActorAll)
    router.get('/select-actor-top', FilmFilterController.selectActorTop)
    router.get('/select-country-day-created', FilmFilterController.selectCountryDayCreated)
    router.get('/select-country-like', FilmFilterController.selectCountryLike)
    router.get('/select-country-all', FilmFilterController.selectCountryAll)
    router.get('/select-country-top', FilmFilterController.selectCountryTop)
    // three
    router.get('/select-genres-actor-country', FilmFilterController.selectGenresActorCountry)
    router.get('/select-genres-actor-day-created', FilmFilterController.selectGenresActorDayCreated)
    router.get('/select-genres-actor-like', FilmFilterController.selectGenresActorLike)
    router.get('/select-genres-actor-all', FilmFilterController.selectGenresActorAll)
    router.get('/select-genres-actor-top', FilmFilterController.selectGenresActorTop)
    router.get('/select-genres-country-day-created', FilmFilterController.selectGenresCountryDayCreated)
    router.get('/select-genres-country-like', FilmFilterController.selectGenresCountryLike)
    router.get('/select-genres-country-all', FilmFilterController.selectGenresCountryAll)
    router.get('/select-genres-country-top', FilmFilterController.selectGenresCountryTop)
    router.get('/select-actor-country-day-created', FilmFilterController.selectActorCountryDayCreated)
    router.get('/select-actor-country-like', FilmFilterController.selectActorCountryLike)
    router.get('/select-actor-country-all', FilmFilterController.selectActorCountryAll)
    router.get('/select-actor-country-top', FilmFilterController.selectActorCountryTop)
    router.get('/select-all-day-created', FilmFilterController.selectAllDayCreated)
    router.get('/select-all-like', FilmFilterController.selectAllLike)
    router.get('/select-all-all', FilmFilterController.selectAllAll)
    router.get('/select-all-top', FilmFilterController.selectAllTop)

    return router
}

export default filmFilterRouter