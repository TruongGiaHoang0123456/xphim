import pool from '../configs/connectDb'
const promisePool = pool.promise();

class FilmsControllers {
    // [method: get], [router: /films/list-film]
    async listFilm(req, res, next) {

        try {
            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, server1, count(*) as views
                from views_film 
                join films on films.id = views_film.film_id
                group by films.id, name, slug, image, likes, server1
            `)

            res.status(200).json(query[0])
        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/watch-film/:filmName/:episode]
    async watchFilm(req, res, next) {
        try {
            const slug = req.params.slug

            const query1 = promisePool.execute(
                `
                SELECT name, server1, server2, server3, description, actors.actor, countrys.country
                FROM films
                join actors on actors.id = films.actor_id
                join countrys on countrys.id = films .country_id
                where slug = ?
                `,
                [slug]
            )

            const query2 = promisePool.execute(
                `
                select genres.genre, genres.id from genre_film
                join films on films.id = genre_film.film_id
                join genres on genres.id = genre_film.genre_id
                where films.slug = ?
                `,
                [slug]
            )

            const query3 = promisePool.execute(
                `
                select films.id, name, slug, image, server1, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where films.id in  ( select films.id
                from films
                join actors on actors.id = films.actor_id
                where actors.actor =
                (select actors.actor
                from films
                join actors on actors.id = films.actor_id
                where slug = ?)
                )
                group by films.id, name, slug, image, server1, likes
                limit 4
                `,
                [slug]
            )

            const query4 = promisePool.execute(
                `
                select films.id, name, slug, image, server1, likes, count(*) as views
                from views_film
                join films on films.id = views_film.film_id
                where films.id in 
                (select genre_film.film_id from genre_film 
                join genres on genres.id = genre_film.genre_id
                where genres.genre in
                (select genre from genre_film
                join genres on genres.id = genre_film.genre_id
                join films on films.id = genre_film.film_id
                where films.slug = ?)
                group by genre_film.film_id)
                group by films.id, name, slug, image, server1, likes
                limit 8
                `,
                [slug]
            )


            Promise.all([query1, query2, query3, query4]).then(([query1, query2, query3, query4]) => {

                const infor_film = query1[0][0]
                // add query 2 into query1 (query 2 is genres)
                infor_film.genres = query2[0]

                const film_related = query3[0].filter((item) => (
                    item.slug !== slug
                ))

                const film_nominated = query4[0]

                const result = {
                    infor_film: infor_film,
                    film_related: film_related,
                    film_nominated: film_nominated
                }

                res.status(200).json(result)
            })



        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/filter-film/filtered-film]
    async filteredFilm(req, res, next) {
        try {
            let { genres, years, minEpisode, status } = req.query

            const genresQuery = genres && "('" + genres.join("', '") + "')";
            const yearsQuery = years && "('" + years.join("', '") + "')";

            if (status === '1')
                status = 'and max(ep.episode) = fi.number_episodes'
            else if (status === '0')
                status = 'and max(ep.episode) != fi.number_episodes'

            let query1 =
                `
                select fi.name, max(ep.episode) as current_episode,
                fi.number_episodes, fi.image, fi.id, fi.year
                from films as fi join episode_film as ep on fi.id = ep.film_id
                where fi.id in (select genre_film.film_id from genre_film join  genres
                on genre_film.genre_id = genres.genre
                where genres.genre
                in ${genresQuery}
                group by genre_film.film_id
                having count(genre_film.film_id) = ${genres ? genres.length : 5})
                and fi.year in ${yearsQuery || '(select year from films)'}
                group by fi.name,
                fi.number_episodes, fi.image, fi.id
                having max(ep.episode) >= ${minEpisode || '0'}
                ${status || ''}
            `
            let query2 =
                `
                select fi.name, max(ep.episode) as current_episode,
                fi.number_episodes, fi.image, fi.year, fi.id
                from films as fi join episode_film as ep on fi.id = ep.film_id
                where fi.year in ${yearsQuery || '(select year from films)'}
                group by fi.id, fi.name,
                fi.number_episodes, fi.image, fi.year
                having count(ep.episode) >= ${minEpisode || '0'}
                ${status || ''}
            `

            let query = (genres ? query1 : query2)

            const [response] = await promisePool.execute(query)

            res.json(response)
        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/filter-film/filter-list]
    async filterList(req, res, next) {
        try {

            const query1 = promisePool.execute(
                `
                select * from genres order by genre
                `
            )

            const query2 = promisePool.execute(
                `
                select distinct year from films order by year desc
                `
            )

            Promise.all([query1, query2])
                .then(([genres, years]) => {
                    const data = {
                        genres: genres[0],
                        years: years[0]
                    }

                    res.json(data)
                })

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/genres-film]
    async genresFilm(req, res, next) {
        try {

            const query = await promisePool.execute(
                `
                select * from genres order by genre asc
                `
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/actors-film]
    async actorsFilm(req, res, next) {
        try {

            const query = await promisePool.execute(
                `
                select * from actors order by actor asc
                `
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/countrys-film]
    async countrysFilm(req, res, next) {
        try {

            const query = await promisePool.execute(
                `
                select * from countrys order by country asc
                `
            )

            res.status(200).json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/search-film]
    async searchFilm(req, res, next) {
        try {
            const { searchValue } = req.query

            const query = await promisePool.execute(
                `
                select films.id, name, slug, image, likes, server1, count(*) as views
                from views_film 
                join films on films.id = views_film.film_id
                where views_film.film_id in (
                select films.id from films
                join actors on actors.id = films.actor_id
                join genre_film on genre_film.film_id = films.id
                join genres on genres.id = genre_film.genre_id
                where films.name like '%${searchValue}%'
                or actors.actor like '%${searchValue}%'
                or genres.genre like '%${searchValue}%'
                group by films.id
                order by films.time desc
                )
                group by films.id, name, slug, image, likes, server1
                `
            )

            res.json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/search-film]
    async evaluateFilm(req, res, next) {
        try {
            const { slug } = req.params

            const query = await promisePool.execute(
                `
                select films.name, films.likes, films.un_likes, count(*) as views from films
                join views_film on views_film.film_id = films.id
                where films.slug = ?
                group by films.name, films.likes, films.un_likes
                `,
                [slug]
            )

            res.json(query[0][0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /films/add-views-film]
    async addViewsFilm(req, res, next) {
        try {
            const { slug } = req.body

            const query = await promisePool.execute(
                `
                insert views_film (film_id)
                select id from films where slug = ?
                `,
                [slug]
            )

            res.json('Add Views Of Film Sucessfully!')

        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /films/add-add-search]
    async addSearch(req, res, next) {
        try {
            const { searchValue } = req.body

            await promisePool.execute(
                `
                insert searchs (value)
                values (?)
                `,
                [searchValue]
            )

            res.json('Add search sucessfully!')

        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /films/update-add-like-film/:slug]
    async updateAddLikeFilm(req, res, next) {
        const { slug } = req.params
        const { status } = req.body

        try {
            if (status === 'ADD_LIKE') {
                const query = await promisePool.execute(
                    `
                    update films set likes = likes + 1
                    WHERE slug = ?
                    `,
                    [slug]
                )

                res.status(200).json('update add like sucessfully!')
            } else if (status === 'REMOTE_LIKE') {
                const query = await promisePool.execute(
                    `
                    update films set likes = likes - 1
                    WHERE slug = ?
                    `,
                    [slug]
                )

                res.status(200).json('update remote like sucessfully!')
            }

        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /films/update-add-dislike-film/:slug]
    async updateAddDislikeFilm(req, res, next) {
        const { slug } = req.params
        const { status } = req.body

        try {

            if (status === 'ADD_DISLIKE') {
                const query = await promisePool.execute(
                    `
                    update films set un_likes = un_likes + 1
                    WHERE slug = ?
                    `,
                    [slug]
                )

                res.status(200).json('update add dislike sucessfully!')
            } else if (status === 'REMOTE_DISLIKE') {
                const query = await promisePool.execute(
                    `
                    update films set un_likes = un_likes - 1
                    WHERE slug = ?
                    `,
                    [slug]
                )

                res.status(200).json('update remove dislike sucessfully!')
            }

        } catch (err) {
            console.log(err)
        }
    }
}

export default new FilmsControllers