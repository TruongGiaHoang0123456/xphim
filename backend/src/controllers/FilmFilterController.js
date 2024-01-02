import pool from '../configs/connectDb'
const promisePool = pool.promise();
import jwt from 'jsonwebtoken'

class FilmFilterController {
    // [method: get], [router: /filter/top-film/:topFilm]
    async topFilm(req, res, next) {

        try {
            const { top } = req.params
            const { limit } = req.query

            const query = await promisePool.execute(
                `
                (select films.id, films.name, films.image, films.slug, films.likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.time >= now() - interval 1 ${top}
                group by films.id, films.name, films.image, films.slug, films.likes)
                order by views desc
                limit ?
                `,
                [limit]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/top-all]
    async topAll(req, res, next) {
        try {
            const { limit } = req.query

            const query = await promisePool.execute(
                `
                select films.id, films.name, films.slug, films.image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                group by films.id, films.name, films.slug, films.image, likes
                order by views desc
                limit ?
            `,
                [limit]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/top-likes]
    async topLikes(req, res, next) {
        try {
            const { limit } = req.query

            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                group by films.id, films.name, slug, image, likes
                order by likes desc
                limit ?
            `,
                [limit]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/top-Actors]
    async topActors(req, res, next) {
        try {
            const { limit } = req.query

            const query = await promisePool.execute(
                `
                select actors.id, actor, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                join actors on actors.id = films.actor_id
                group by actors.id, actor
                order by views desc
                limit ?
            `,
                [limit]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/top-searchs]
    async topSearchs(req, res, next) {
        try {
            const { limit } = req.query

            const query = await promisePool.execute(
                `
                select value, count(*) as count
                from searchs
                group by value
                order by count desc
                limit ?
            `,
                [limit]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/non-select]
    async nonSelect(req, res, next) {
        try {
            const query = await promisePool.execute(
                `
                SELECT id, name, slug, image FROM films order by time desc;
            `)

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres]
    async selectGenres(req, res, next) {
        const { genres } = req.query
        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor/:actor]
    async selectActor(req, res, next) {
        const { actor } = req.params

        try {
            const query = await promisePool.execute(
                `select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in 
                (select films.id
                from films
                join actors on actors.id = films.actor_id
                where actors.actor = ?)
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [actor]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-country/:country]
    async selectCountry(req, res, next) {
        const { country } = req.params

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                    select films.id
                    from films
                    join countrys on countrys.id = films.country_id
                    where countrys.country = ?
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-top-movie/day-created]
    async selectDayCreated(req, res, next) {
        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                group by films.id, name, slug, image
                order by films.time desc
            `
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-top-movie/likes]
    async selectLikes(req, res, next) {
        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                group by films.id, name, slug, image
                order by films.likes desc
            `
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-top-movie/all]
    async selectAll(req, res, next) {
        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, films.slug, films.image, films.likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                group by films.id, films.name, films.slug, films.image, films.likes
                order by views desc
            `
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-top-movie/:top]
    async selectTop(req, res, next) {
        const { top } = req.params

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, films.slug, films.image, films.likes, count(*) as views from views_film
                join films on films.id = views_film.film_id
                where views_film.time >= now() - interval 1 ${top}
                group by films.id, films.name, films.slug, films.image, films.likes
                order by views desc
            `
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-actor]
    async selectGenresActor(req, res, next) {
        const { genres, actor } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                    select films.id
                    from films
                    join actors on actors.id = films.actor_id
                    where actors.actor = ?
                    and films.id in (
                        select genre_film.film_id
                        from genre_film
                        join genres on genres.id = genre_film.genre_id
                        where genres.genre in ('${queryGenres}')
                        group by genre_film.film_id
                        having count(genre_film.film_id) = ?
                    )
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [actor, genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-country]
    async selectGenresCountry(req, res, next) {
        const { genres, country } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                    select films.id
                    from films
                    join countrys on countrys.id = films.country_id
                    where countrys.country = ?
                and films.id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [country, genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-day-created]
    async selectGenresDayCreated(req, res, next) {
        const { genres } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                    select id
                    FROM films
                    where id in
                    (select genre_film.film_id
                    from genre_film
                    join genres on genres.id = genre_film.genre_id
                    where genres.genre in ('${queryGenres}')
                    group by genre_film.film_id
                    having count(genre_film.film_id) = ?)
                    order by films.time desc
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-likes]
    async selectGenresLikes(req, res, next) {
        const { genres } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select id
                FROM films
                where id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                )
                group by films.id, name, slug, image
                order by films.likes desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-all]
    async selectGenresAll(req, res, next) {
        const { genres } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image,likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-top/:top]
    async selectGenresTop(req, res, next) {
        const { genres } = req.query
        const { top } = req.params

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                and views_film.time > now() - interval 1 ${top}
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor-country]
    async selectActorCountry(req, res, next) {
        const { actor, country } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                from films
                join actors on actors.id = films.actor_id
                join countrys on countrys.id = films.country_id 
                where actors.actor = ?
                and countrys.country = ?
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [actor, country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor-day-created]
    async selectActorDayCreated(req, res, next) {
        const { actor } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                from films
                join actors on actors.id = films.actor_id
                where actors.actor = ?
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [actor]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor-like]
    async selectActorLike(req, res, next) {
        const { actor } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                from films
                join actors on actors.id = films.actor_id
                where actors.actor = ?
                )
                group by films.id, name, slug, image
                order by films.likes desc
            `,
                [actor]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor-all]
    async selectActorAll(req, res, next) {
        const { actor } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where films.id in (
                select films.id from films
                join actors on actors.id = films.actor_id
                where actors.actor = ?
                )
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [actor]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor-top]
    async selectActorTop(req, res, next) {
        const { actor, top } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where films.id in (
                select films.id from films
                join actors on actors.id = films.actor_id
                where actors.actor = ?
                )
                and views_film.time >= now() - interval 1 ${top}
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [actor]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-country-day-created]
    async selectCountryDayCreated(req, res, next) {
        const { country } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                from films
                join countrys on countrys.id = films.country_id
                where countrys.country = ?
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-country-like]
    async selectCountryLike(req, res, next) {
        const { country } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                from films
                join countrys on countrys.id = films.country_id
                where countrys.country = ?
                )
                group by films.id, name, slug, image
                order by films.likes desc
            `,
                [country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-country-all]
    async selectCountryAll(req, res, next) {
        const { country } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where films.id in (
                select films.id from films
                join countrys on countrys.id = films.country_id
                where countrys.country = 'Nhật Bản'
                )
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-country-top]
    async selectCountryTop(req, res, next) {
        const { country, top } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where films.id in (
                select films.id from films
                join countrys on countrys.id = films.country_id
                where countrys.country = ?
                )
                and views_film.time >= now() - interval 1 ${top}
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/genres-actor-country]
    async selectGenresActorCountry(req, res, next) {
        const { genres, actor, country } = req.query

        try {

            const queryGenres = genres.join(', ')

            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                from films
                join actors on actors.id = films.actor_id
                join countrys on countrys.id = films.country_id
                where actors.actor = '${actor}'
                and countrys.country = '${country}'
                and films.id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-actor-day-created]
    async selectGenresActorDayCreated(req, res, next) {
        const { genres, actor } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                FROM films
                join actors on actors.id = films.actor_id
                where actors.actor = '${actor}'
                and films.id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-actor-like]
    async selectGenresActorLike(req, res, next) {
        const { genres, actor } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                FROM films
                join actors on actors.id = films.actor_id
                where actors.actor = '${actor}'
                and films.id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                )
                group by films.id, name, slug, image
                order by films.likes desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-actor-all]
    async selectGenresActorAll(req, res, next) {
        const { genres, actor } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                and genre_film.film_id in (
                    select films.id from films
                    join actors on actors.id = films.actor_id
                    where actors.actor = '${actor}'
                )
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-actor-top]
    async selectGenresActorTop(req, res, next) {
        const { genres, actor, top } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                and genre_film.film_id in
                (
                select films.id from films
                join actors on actors.id = films.actor_id
                where actors.actor = '${actor}'
                )
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                and views_film.time > now() - interval 1 ${top}
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-country-day-created]
    async selectGenresCountryDayCreated(req, res, next) {
        const { genres, country } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                FROM films
                join countrys on countrys.id = films.country_id
                where countrys.country = '${country}'
                and films.id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-country-like]
    async selectGenresCountryLike(req, res, next) {
        const { genres, country } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                FROM films
                join countrys on countrys.id = films.country_id
                where countrys.country = '${country}'
                and films.id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                )
                group by films.id, name, slug, image
                order by films.likes desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-country-all]
    async selectGenresCountryAll(req, res, next) {
        const { genres, country } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                and genre_film.film_id in (
                    select films.id from films
                    join countrys on countrys.id = films.country_id
                    where countrys.country = '${country}'
                )
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-genres-country-top]
    async selectGenresCountryTop(req, res, next) {
        const { genres, country, top } = req.query

        const queryGenres = genres.join(`', '`)

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                and genre_film.film_id in
                (
                select films.id from films
                join countrys on countrys.id = films.country_id
                where countrys.country = '${country}'
                )
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                and views_film.time > now() - interval 1 ${top}
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor-country-day-created]
    async selectActorCountryDayCreated(req, res, next) {
        const { actor, country } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                from films
                join actors on actors.id = films.actor_id
                join countrys on countrys.id = films.country_id 
                where actors.actor = ?
                and countrys.country = ?
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [actor, country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor-country-like]
    async selectActorCountryLike(req, res, next) {
        const { actor, country } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                from films
                join actors on actors.id = films.actor_id
                join countrys on countrys.id = films.country_id 
                where actors.actor = ?
                and countrys.country = ?
                )
                group by films.id, name, slug, image
                order by films.likes desc
            `,
                [actor, country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor-country-all]
    async selectActorCountryAll(req, res, next) {
        const { actor, country } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film 
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id from films
                join actors on actors.id = films.actor_id
                join countrys on countrys.id = films.country_id
                where actors.actor = ?
                and countrys.country = ?
                )
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [actor, country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-actor-country-top]
    async selectActorCountryTop(req, res, next) {
        const { actor, country, top } = req.query

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film 
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id from films
                join actors on actors.id = films.actor_id
                join countrys on countrys.id = films.country_id
                where actors.actor = ?
                and countrys.country = ?
                )
                and views_film.time >= now() - interval 1 ${top}
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [actor, country]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-all-day-created]
    async selectAllDayCreated(req, res, next) {
        const { genres, actor, country } = req.query

        const queryGenres = genres.join(', ')

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                FROM films
                join countrys on countrys.id = films.country_id
                join actors on actors.id = films.actor_id
                where countrys.country = '${country}'
                and actors.actor = '${actor}'
                and films.id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                )
                group by films.id, name, slug, image
                order by films.time desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-all-like]
    async selectAllLike(req, res, next) {
        const { genres, actor, country } = req.query

        const queryGenres = genres.join(', ')

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, count(views_film.id) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id
                FROM films
                join countrys on countrys.id = films.country_id
                join actors on actors.id = films.actor_id
                where countrys.country = '${country}'
                and actors.actor = '${actor}'
                and films.id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                )
                group by films.id, name, slug, image
                order by films.likes desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-all-all]
    async selectAllAll(req, res, next) {
        const { genres, actor, country } = req.query

        const queryGenres = genres.join(', ')

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where views_film.film_id in
                (select genre_film.film_id
                from genre_film
                join genres on genres.id = genre_film.genre_id
                where genres.genre in ('${queryGenres}')
                and genre_film.film_id in (
                    select films.id from films
                    join countrys on countrys.id = films.country_id
                    join actors on actors.id = films.actor_id
                    where countrys.country = '${country}'
                    and actors.actor = '${actor}'
                )
                group by genre_film.film_id
                having count(genre_film.film_id) = ?)
                group by films.id, films.name, slug, image, likes
                order by views desc
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /filter/select-all-top]
    async selectAllTop(req, res, next) {
        const { genres, actor, country, top } = req.query

        console.log(genres, actor, country, top);

        const queryGenres = genres.join(', ')

        try {
            const query = await promisePool.execute(
                `
                select films.id, films.name, slug, image, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                    where views_film.time >= now() - interval 1 ${top}
                    and views_film.film_id in (
                    select genre_film.film_id
                    from genre_film
                    join genres on genres.id = genre_film.genre_id
                    where genres.genre in ('${queryGenres}')
                    and genre_film.film_id in (
                        select films.id from films
                        join countrys on countrys.id = films.country_id
                        join actors on actors.id = films.actor_id
                        where countrys.country = '${country}'
                        and actors.actor = '${actor}'
                    )
                    group by genre_film.film_id
                    having count(genre_film.film_id) = ?
                )
                group by films.id, films.name, slug, image, likes
                order by views desc
                
            `,
                [genres.length]
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

}

export default new FilmFilterController