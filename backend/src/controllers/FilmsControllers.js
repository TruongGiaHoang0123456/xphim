import pool from '../configs/connectDb'
const promisePool = pool.promise();

class FilmsControllers {
    // [method: get], [router: /films/list-film]
    async listFilm(req, res, next) {

        try {
            const query1 = await promisePool.execute(
                `
                select f.id, f.name, f.image, f.number_episodes, f.movie_duration,f.description, max(e.episode) as current_episode 
                from episode_film as e join films as f 
                on e.film_id = f.id 
                group by f.name, f.image, f.number_episodes, f.id
            `)

            const query2 = promisePool.execute(
                `
                select evaluate_user_film.film_id,  cast(avg(evaluate_user_film.evaluate_id) as decimal(10,1)) as medium_point
                from evaluate_user_film
                join films on films.id = evaluate_user_film.film_id
                group by evaluate_user_film.film_id
                `
            )

            Promise.all([query1, query2]).then((data) => {
                let followedFilm = data[0][0];
                let mediumPoint = data[1][0];

                function addMediumPoint(followedFilm, mediumPoint) {
                    let updatedFollowedFilm = followedFilm.map((film) => {
                        let match = mediumPoint.find((point) => point.film_id === film.id);

                        if (match) {
                            film.medium_point = match.medium_point;
                        } else {
                            film.mediumPoint = null
                        }

                        return film;
                    });

                    return updatedFollowedFilm;
                }

                let result = addMediumPoint(followedFilm, mediumPoint);

                res.json(result)
            })
        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/infor-film]
    async inforFilm(req, res, next) {
        try {
            const id = req.query.filmId
            const querys = [
                promisePool.execute(
                    `
                    select *
                    from films join episode_film on films.id = episode_film.film_id
                    where films.id = ?
                `,
                    [id]
                ),
                promisePool.execute(
                    `
                    select max(episode_film.episode) as max_current from episode_film join films
                    on episode_film.film_id = films.id
                    and episode_film.film_id = ?
                `,
                    [id]
                ),
                promisePool.execute(
                    `
                    select genres.genre from genre_film 
                    join genres on genres.genre = genre_film.genre_id
                    where film_id = ?
                `,
                    [id]
                ),
                promisePool.execute(
                    `
                    select avg(evaluate_user_film.evaluate_id) as avg, count(evaluate_user_film.film_id) as count
                    from evaluate_user_film 
                    join evaluates on evaluates.id = evaluate_user_film.evaluate_id
                    where evaluate_user_film.film_id = ?
                    group by evaluate_user_film.film_id
                `,
                    [id]
                ),
                promisePool.execute(
                    `
                    SELECT epo.episode, epo.video_link
                    from episode_film as epo
                    where epo.film_id = ? and epo.source_link = 'ophim'
                    order by epo.episode desc
                `,
                    [id]
                ),
                promisePool.execute(
                    `
                    select fi.id as current_film_link, fi.part as current_part, fir.part as related_part, 
                    fir.id as related_film_link
                    from related_film as re, films as fi, films as fir
                    where re.film_id = fi.id and re.film_id = ?
                    and re.related_id = fir.id
                `,
                    [id]
                ),
            ]

            Promise.all(querys).then((data) => {

                const result = {
                    infor_film: data[0][0][0],
                    max_current: data[1][0][0].max_current,
                    genres: data[2][0],
                    medium_point: data[3][0][0],
                    episode_film: data[4][0],
                    related_film: data[5][0],
                }

                res.json(result)
            })

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/comment-film]
    async commentFilm(req, res, next) {
        try {
            const filmId = req.query.filmId
            const response = await promisePool.query(
                `
                select users.name, users.id as user_id, users.level, users.avatar, comment_user_film.film_id, comment_user_film.content, comment_user_film.time, comment_user_film.id
                from comment_user_film
                join episode_film on comment_user_film.film_id = episode_film.film_id
                and comment_user_film.episode = episode_film.episode
                join users on comment_user_film.user_id = users.id
                where comment_user_film.film_id = ?
                group by users.name, users.id, users.level, users.avatar, comment_user_film.film_id, comment_user_film.content, comment_user_film.time, comment_user_film.id
                order by time desc
                `,
                [filmId]
            )

            const [data] = response

            res.json(data)
        }

        catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/rep-comment]
    async repComment(req, res, next) {
        try {
            const filmId = req.query.filmId
            const data = await promisePool.query(
                `
                select users.name, users.level, users.id as user_id, users.avatar, rep_comment.content, rep_comment.time, rep_comment.id_comment_film, rep_comment.id as comment_rep_id
                from rep_comment
                join users on users.id = rep_comment.user_id
                join comment_user_film on comment_user_film.id = rep_comment.id_comment_film
                where comment_user_film.film_id = ?
                order by rep_comment.time asc
                `,
                [filmId]
            )

            res.json(data[0])
        }

        catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/rep-episode-comment]
    async repEpisodeComment(req, res, next) {
        try {
            const { id, episode } = req.params
            const data = await promisePool.query(
                `
                select users.name, users.level, users.avatar, users.id as user_id, rep_comment.content, rep_comment.time, rep_comment.id_comment_film,  rep_comment.id as comment_rep_id
                from rep_comment
                join users on users.id = rep_comment.user_id
                join comment_user_film on comment_user_film.id = rep_comment.id_comment_film
                where comment_user_film.film_id = ? and comment_user_film.episode = ?
                order by rep_comment.time asc
                `,
                [id, episode]
            )

            res.json(data[0])
        }

        catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/comment-episode-film]
    async commentEpisodeFilm(req, res, next) {
        try {
            const { id, episode } = req.params
            const response = await promisePool.query(
                `
                select users.name, users.level, users.avatar, users.id as user_id, comment_user_film.content, comment_user_film.time, comment_user_film.id
                from comment_user_film
                join episode_film on comment_user_film.film_id = episode_film.film_id
                and comment_user_film.episode = episode_film.episode
                join users on comment_user_film.user_id = users.id
                where comment_user_film.film_id = ?
                and episode_film.episode = ?
                group by users.name, users.level, users.avatar, users.id, comment_user_film.content, comment_user_film.time, comment_user_film.id
                order by time desc
                `,
                [id, episode]
            )

            const [data] = response

            res.json(data)
        }

        catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/watch-film/:filmName/:episode]
    async watchFilm(req, res, next) {
        try {
            const { filmName, episode } = req.params

            const querys = [
                promisePool.execute(
                    `
                    select fi.id, fi.name, ep.episode, ep.time_upLoad, ep.video_link, ep.source_link
                    from films as fi, episode_film as ep
                    where fi.id = ? and ep.episode = ? and fi.id = ep.film_id
                `,
                    [filmName, episode]
                ),
                promisePool.execute(
                    `
                    select ep.video_link, fi.name, ep.episode
                    from films as fi, episode_film as ep
                    where fi.id = ? and fi.id = ep.film_id and ep.episode > ? and ep.episode < ?
                `,
                    [filmName, episode, episode + 2]
                ),
                promisePool.execute(
                    `
                    select ep.episode, ep.video_link
                    from films as fi, episode_film as ep
                    where fi.id = ? and fi.id = ep.film_id and ep.source_link = 'ophim'
                    order by ep.episode desc
                `,
                    [filmName]
                )
            ]

            Promise.all(querys).then((data) => {
                const inforFilm = data[0][0][0]

                for (let i = 0; i < data[0][0].length; i++) {
                    inforFilm[data[0][0][i].source_link] = data[0][0][i].video_link
                }

                delete inforFilm.video_link
                delete inforFilm.source_link

                const result = {
                    infor_film: inforFilm,
                    next_film: data[1][0][0],
                    list_film: data[2][0]
                }

                res.json(result)
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

    // [method: get], [router: /films/views-film]
    async viewsFilm(req, res, next) {
        try {

            const query = await promisePool.execute(
                `
                select episode_film.film_id, films.name, films.number_episodes, films.image, max(episode_film.episode) as maxEpisode
                from episode_film
                join films on films.id = episode_film.film_id
                where episode_film.film_id in
                (select * from (select views_film.film_id
                from views_film
                join films
                on films.id = views_film.film_id
                group by views_film.film_id
                order by count(film_id) desc
                limit 10) temp_table)
                group by episode_film.film_id, films.name, films.number_episodes, films.image
                `
            )

            res.json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/search-film]
    async searchFilm(req, res, next) {
        try {
            const { name } = req.query

            const query = await promisePool.execute(
                `
                select episode_film.film_id, films.name, films.number_episodes, films.image, max(episode_film.episode) as maxEpisode
                from episode_film
                join films on films.id = episode_film.film_id
                where films.name in (select name from films where name like '%${name}%')
                group by episode_film.film_id, films.name, films.number_episodes, films.image
                `
            )

            res.json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /films/add-views-film]
    async addViewsFilm(req, res, next) {
        try {
            const { filmId } = req.body

            const query = await promisePool.execute(
                `
                insert views_film (film_id)
                values (?)
                `,
                [filmId]
            )

            res.json('Add Views Of Film Sucessfully!')

        } catch (err) {
            console.log(err)
        }
    }
}

export default new FilmsControllers