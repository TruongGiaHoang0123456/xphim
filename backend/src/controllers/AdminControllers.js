import { upload } from '../routes/usersRouter';
import pool from '../configs/connectDb'
const promisePool = pool.promise();
const Mailjet = require('node-mailjet');
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// defined let random
let randomString;

class AdminControllers {
    // [method: get], [router: /admin/render-page-add-film]
    async renderPageAddFilmm(req, res, next) {
        try {

            const query = await promisePool.execute(
                `
                select * from genres order by genre asc
                `
            )

            const response = {
                genresList: query[0]
            }

            res.status(200).json(response)


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: post], [router: /admin/add-film]
    async addFilm(req, res, next) {
        try {

            const {
                filmName, filmDescription,
                numberEpisodes, releaseYear, filmThumbnail,
                filmPart, selectGenre
            } = req.body

            // check name film
            const checkFilm = await promisePool.execute(
                `
                select name from films where name = ?
                `,
                [filmName]
            )

            if (checkFilm[0].length !== 0) {
                return res.status(200).json('The movie already exists!')
            }


            // insert film
            await promisePool.execute(
                `
                    insert films (name, description, numberEpisodes, year, image, part)
                    values 
                    (?, ?, ?, ?, ?, ?)
                    `,
                [
                    filmName, filmDescription,
                    numberEpisodes, releaseYear, filmThumbnail,
                    filmPart
                ]
            )

            // search id by name fim
            const getFilmId = await promisePool.execute(
                `
                select id from films where binary name = ?
                `,
                [filmName]
            )

            const filmId = getFilmId[0][0].id

            // insert genre of film
            const genre = selectGenre.map(genre => {
                return `(${filmId}, ?)`
            })


            await promisePool.execute(
                `
                 insert genre_film (film_id, genre_id)
                    values 
                    ${genre.join(', ')}
                 `,
                selectGenre
            )

            res.status(200).json('Add film sucessfully!')

        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: post], [router: /admin/add-episode-film]
    async addEpisodeFilm(req, res, next) {
        try {

            const {
                filmName, filmId, filmEpisode, videoLink, filmSource
            } = req.body

            console.log('filmSource', typeof filmSource)

            if (filmName === '') {
                return res.status(200).json('Movie name has not been imported yet')
            }
            if (filmEpisode === '') {
                return res.status(200).json('Movie episode has not been imported yet')
            }
            if (videoLink === '') {
                return res.status(200).json('Movie link has not been imported yet')
            }
            if (filmSource === '') {
                return res.status(200).json('Movie source has not been imported yet')
            }

            // check source of film
            const checkEpisodeFilm = await promisePool.execute(
                `
                select episode from episodeoffilm where film_id = ? and episode = ? and source_link = ?
                `,
                [filmId, filmEpisode, filmSource]
            )

            if (checkEpisodeFilm[0].length >= 1) {
                return res.json('The source film already exists!')
            }

            // check video of episode film
            const checkVideoLink = await promisePool.execute(
                `
                select episode from episodeoffilm where film_id = ? and videoLink = ?
                `,
                [filmId, videoLink]
            )

            if (checkVideoLink[0].length >= 1) {
                return res.json('The link video already exists!')
            }

            // insert episode of film
            await promisePool.execute(
                `
                insert episodeoffilm (episode, film_id, videoLink, source_link)
                values 
                (?, ?, ?, ?)
                `,
                [filmEpisode, filmId, videoLink, filmSource]
            )

            return res.status(200).json('Add episode film sucessfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }
}

export default new AdminControllers