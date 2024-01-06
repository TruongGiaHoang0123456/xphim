import { upload } from '../routes/usersRouter';
import pool from '../configs/connectDb'
const promisePool = pool.promise();
const Mailjet = require('node-mailjet');
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { response } from 'express';
const bcrypt = require('bcryptjs');

// defined let random
let randomString;

class AdminControllers {
    // [method: get], [router: /admin/search-film]
    async searchFilm(req, res, next) {
        try {
            const { searchValue } = req.query

            const queryListFilm = promisePool.execute(
                `
                SELECT films.id, name, slug, description, image, actors.actor, countrys.country, server1, server2, likes, un_likes, average_likes, films.time, films.source, count(DISTINCT views_film.id) as views
                FROM views_film 
                JOIN films ON films.id = views_film.film_id
                JOIN actors ON actors.id = films.actor_id
                JOIN countrys ON countrys.id = films.country_id
                WHERE views_film.film_id IN (
                    SELECT films.id FROM films
                    JOIN actors ON actors.id = films.actor_id
                    JOIN countrys ON countrys.id = films.country_id
                    WHERE films.name LIKE '% %'
                    OR actors.actor LIKE '% %'
                    OR countrys.country LIKE '% %'
                    ORDER BY films.time DESC
                )
                GROUP BY films.id, name, slug, description, image, actors.actor, countrys.country, server1, server2, likes, un_likes, average_likes, films.time, films.source
                order by films.time desc
                `
            )

            const queryListGenres = promisePool.execute(
                `
                select film_id, genres.genre
                from genre_film
                join genres on genres.id = genre_film.genre_id
                group by film_id, genres.genre
                `
            )

            Promise.all([queryListFilm, queryListGenres]).then(([queryListFilm, queryListGenres]) => {
                const result = queryListFilm[0].map(item => {
                    const result = queryListGenres[0].filter(item2 => {
                        return item2.film_id === item.id
                    })

                    const result2 = result.map(item => {
                        return item.genre
                    })

                    item.genres = result2
                    return item
                })
                res.status(200).json(result)
            })

        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: get], [router: /admin/get-error]
    async getError(req, res, next) {
        try {
            const { limit } = req.query

            const selectNotify_error = await promisePool.execute(
                `
                select id, server, description, slug, is_read, time from notify_error
                group by id, server, description, slug, is_read, time
                order by is_read asc, time desc
                limit ?
                `,
                [limit]
            )

            res.status(200).json(selectNotify_error[0])

        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: get], [router: /admin/detail-error/:id]
    async detailError(req, res, next) {
        try {
            const { id } = req.params

            const querySelectNotify_error = await promisePool.execute(
                `
                select * from notify_error
                where id = ?
                `,
                [id]
            )

            res.status(200).json(querySelectNotify_error[0][0])

        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: get], [router: /admin/all-error]
    async allError(req, res, next) {
        try {

            const querySelectNotify_error = await promisePool.execute(
                `
                select * from notify_error
                order by is_read desc, time desc
                `
            )

            res.status(200).json(querySelectNotify_error[0])

        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: get], [router: /admin/check-token]
    async checkToken(req, res, next) {
        try {
            const token = req.cookies.access_token
            if (!token) {
                return res.json('Not found token!')
            }

            jwt.verify(token, process.env.ACCESTOKEN, function (err, decoded) {
                if (decoded) {
                    res.json('Check token succesfully!')
                } else {
                    res.json('Token expired!')
                }
            });


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: post], [router: /admin/log-in]
    async login(req, res, next) {
        try {
            const { account, password } = req.body

            const query = await promisePool.execute(
                `
                select * from users where BINARY accounts = ?
                `,
                [account]
            )

            if (query[0].length === 0) {
                return res.status(200).json('Not found account!')
            }


            const checkPw = bcrypt.compareSync(password, query[0][0].passwords)



            if (!checkPw) {
                return res.json('Account or Password is incorrect!')
            }

            // jwt
            const token = jwt.sign({
                data: 'foobar'
            },
                process.env.ACCESTOKEN, {
                expiresIn: '2h'
            });

            // create cookie
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: true
            })

            res.status(200).json('Login secessfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: post], [router: /admin/add-film]
    async addFilm(req, res, next) {
        try {

            const {
                name, slug, description, thumbnail, selectGenre, selectActor, selectCountry, server1, server2
            } = req.body

            console.log('result', req.body);

            // check name film
            const checkName = promisePool.execute(
                `
                    select name from films where name = ?
                `,
                [name]
            )

            // check slug film
            const checkSlug = promisePool.execute(
                `
                    select slug from films where name = ?
                `,
                [slug]
            )

            // check server1 film
            const checkServer1 = promisePool.execute(
                `
                    select slug from films where name = ?
                `,
                [server1]
            )

            // check server2 film
            const checkServer2 = promisePool.execute(
                `
                    select slug from films where name = ?
                `,
                [server2]
            )

            // check error
            Promise.all([checkName, checkSlug, checkServer1, checkServer2]).then(([checkName, checkSlug, checkServer1, checkServer2]) => {
                if (checkName[0].length !== 0) {
                    return res.json('Name movie expired!')
                }
                if (checkSlug[0].length !== 0) {
                    return res.json('Slug movie expired!')
                }
                if (checkSlug[0].length !== 0) {
                    return res.json('server1 expired!')
                }
                if (checkServer2[0].length !== 0) {
                    return res.json('server2 expired!')
                }

                // insert films except id actor, id country, genres
                const addFilm = async () => {
                    await promisePool.execute(
                        `
                            insert films (name, slug, description, image, server1, server2)
                            values 
                            ('${name}',
                            '${slug}',
                            '${description}',
                            '${thumbnail}',
                            '${server1}',
                            '${server2}'
                            )
                         `
                    )
                }
                addFilm()

                // get id film
                const queryIdFilm = promisePool.execute(
                    `
                    select id from films where name = ?
                `,
                    [name]
                )

                // get id actor
                const queryIdActor = promisePool.execute(
                    `
                    select id from actors where actor = ? 
                `,
                    [selectActor]
                )

                // get id country
                const queryIdCountry = promisePool.execute(
                    `
                    select id from countrys where country = ? 
                `,
                    [selectCountry]
                )

                // get id genres
                const queryGenres = selectGenre.join(`', '`)
                const queryIdGenres = promisePool.execute(
                    `
                    select * from genres where genre in ('${queryGenres}')
                `
                )

                // get id film, actor, country, genres
                Promise.all([queryIdFilm, queryIdActor, queryIdCountry, queryIdGenres]).then(([queryIdFilm, queryIdActor, queryIdCountry, queryIdGenres]) => {
                    const idFilms = queryIdFilm[0][0].id
                    const idActor = queryIdActor[0][0].id
                    const idCountry = queryIdCountry[0][0].id
                    const idGenres = queryIdGenres[0]

                    // insert id actor, id country into films
                    const queyInsertActorCountry = promisePool.execute(
                        `
                            update films set actor_id = ?, country_id = ?
                            WHERE name = ?
                        `,
                        [idActor, idCountry, name]
                    )

                    // insert genres into films(table genre_film)
                    const queryInsertGenres = promisePool.execute(
                        `
                            insert into genre_film (film_id, genre_id)
                            values ${idGenres.map((genre) => `(${idFilms}, ${genre.id})`).join(',')}
                        `
                    );

                    // insert views film
                    const queryInsertViewFilm = promisePool.execute(
                        `
                            insert into views_film (film_id)
                            values (?)
                        `,
                        [idFilms]
                    );

                    Promise.all([queyInsertActorCountry, queryInsertGenres, queryInsertViewFilm]).then(() => {
                        res.status(200).json('Add film sucessfully!')
                    })
                })
            })


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: post], [router: /admin/add-genre]
    async addGenre(req, res, next) {
        try {

            const { genre } = req.body

            const trimGenre = genre.trim()

            if (!trimGenre) {
                return res.status(200).json('Invalid value!')
            }

            const checkGenre = await promisePool.execute(
                `
                select * from genres where genre = ?
                `,
                [trimGenre]
            )
            if (checkGenre[0].length !== 0) {
                return res.status(200).json('Genre already exists!')
            }

            await promisePool.execute(
                `
                insert genres (genre)
                values (?)
                `,
                [trimGenre]
            )

            return res.status(200).json('Add genre sucessfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: post], [router: /admin/add-actor]
    async addActor(req, res, next) {
        try {

            const { actor } = req.body

            const trimActor = actor.trim()

            if (!trimActor) {
                return res.status(200).json('Invalid value!')
            }

            const checkActor = await promisePool.execute(
                `
                select * from actors where actor = ?
                `,
                [trimActor]
            )
            if (checkActor[0].length !== 0) {
                return res.status(200).json('Actor already exists!')
            }

            await promisePool.execute(
                `
                insert actors (actor)
                values (?)
                `,
                [trimActor]
            )

            return res.status(200).json('Add actor sucessfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: post], [router: /admin/add-country]
    async addCountry(req, res, next) {
        try {

            const { country } = req.body

            const trimCountry = country.trim()

            if (!trimCountry) {
                return res.status(200).json('Invalid value!')
            }

            const checkCountry = await promisePool.execute(
                `
                select * from countrys where country = ?
                `,
                [trimCountry]
            )
            if (checkCountry[0].length !== 0) {
                return res.status(200).json('Country already exists!')
            }

            await promisePool.execute(
                `
                insert countrys (country)
                values (?)
                `,
                [trimCountry]
            )

            return res.status(200).json('Add country sucessfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: post], [router: /admin/add-error]
    async addError(req, res, next) {
        try {

            const { errorServerValue, errorDescriptValue, slug } = req.body

            const addErrorQuery = await promisePool.execute(
                `
                insert notify_error (server, description, slug)
                values
                (? , ?, ?)
                `,
                [errorServerValue, errorDescriptValue, slug]
            )

            return res.status(200).json('Add error sucessfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: put], [router: /admin/update-password]
    async updatePassword(req, res, next) {
        try {
            const { account, currentPassword, newPassword } = req.body

            const query = await promisePool.execute(
                `
                select * from users where BINARY accounts = ?
                `,
                [account]
            )

            console.log('xin chao');

            if (query[0].length === 0) {
                return res.status(200).json('Not found account!')
            }


            const checkPw = bcrypt.compareSync(currentPassword, query[0][0].passwords)

            if (!checkPw) {
                return res.json('Account or Password is incorrect!')
            }

            const salt = bcrypt.genSaltSync(10);
            const hashNewPassword = bcrypt.hashSync(newPassword, salt);

            const updatePassword = await promisePool.execute(
                `
                update users set passwords = ?
                WHERE accounts = ?
                `,
                [hashNewPassword, account]
            )


            console.log('a', updatePassword[0])

            res.status(200).json('update password sucessfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: put], [router: /admin/update-genre]
    async updateGenre(req, res, next) {
        try {
            const { id, genre } = req.body

            const query = await promisePool.execute(
                `
                update genres set genre = ?
                WHERE id = ?
                `,
                [genre, id]
            )

            res.status(200).json('Update genre sucessfully!')
        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: put], [router: /admin/update-actor]
    async updateActor(req, res, next) {
        try {
            const { id, actor } = req.body

            const query = await promisePool.execute(
                `
                update actors set actor = ?
                WHERE id = ?
                `,
                [actor, id]
            )

            res.status(200).json('Update actor sucessfully!')
        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: put], [router: /admin/update-country]
    async updateCountry(req, res, next) {
        try {
            const { id, country } = req.body

            const query = await promisePool.execute(
                `
                update countrys set country = ?
                WHERE id = ?
                `,
                [country, id]
            )

            res.status(200).json('Update country sucessfully!')
        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: put], [router: /admin/update-films]
    async updateFilms(req, res, next) {
        try {
            const {
                id, imageValue, nameValue, slugValue, genresValue, actorValue,
                countryValue, descriptionValue, viewsValue, likesValue, unLikesValue,
                avrLikesValue, server1Value, server2Value, server3Value = '', timeValue, sourceValue
            } = req.body

            // check actor
            const getIdActor = promisePool.execute(
                `
                select id from actors where actor = ?
                `,
                [actorValue]
            )

            // check country
            const getIdCountry = promisePool.execute(
                `
                select id from countrys where country = ?
                `,
                [countryValue]
            )

            // check genre
            const arrGenresValue = genresValue.split(',')

            const queryGenre = promisePool.execute(
                `
            select id, genre from genres where genre in ('${arrGenresValue.join(`', '`)}')
            `
            )

            // delete genre in genre_film to add genre new into genre_fim
            const queryDeleteGenre = promisePool.execute(
                `
                delete from genre_film where film_id = ?
                `,
                [id]
            )

            Promise.all([getIdActor, getIdCountry, queryGenre, queryDeleteGenre])
                .then(([getIdActor, getIdCountry, queryGenre]) => {
                    // check error actor
                    if (getIdActor[0].length === 0) {
                        return res.json('Actor not exist!')
                    }
                    const actorId = getIdActor[0][0].id


                    // check error country
                    if (getIdCountry[0].length === 0) {
                        return res.json('Country not exist!')
                    }
                    const countryId = getIdCountry[0][0].id


                    // check genres
                    const genre = queryGenre[0]
                    // get id genre conver to arr
                    const genreId = genre.map(item => (
                        item.id
                    ))
                    // get genre covert to arr
                    const arrGenresQuery = genre.map(item => (
                        item.genre
                    ))
                    // check error if value genre hasn't in db
                    const checkErrorGenre = arrGenresValue.filter(item => {

                        return !arrGenresQuery.includes(item)
                    })
                    // show error if value genre hasn't in db
                    if (checkErrorGenre.length !== 0) {
                        return res.json(['Not found genre!', checkErrorGenre.join(', ')])
                    }
                    // add genre new into genre_fim
                    const idGenresArrount = genreId.map(item => {
                        return `(${id}, ${item})`
                    }).join(',')

                    // insert genres
                    const queryInsertGenres = promisePool.execute(
                        `
                        insert genre_film (film_id, genre_id)
                        values
                        ${idGenresArrount}
                        `
                    )

                    // update films
                    const date = new Date(timeValue);
                    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
                    const queryUpdateFilms = promisePool.execute(
                        `
                        update films
                        set
                            name = ?,
                            slug = ?,
                            description = ?,
                            image = ?, 
                            actor_id  = ?, 
                            country_id  = ?, 
                            server1  = ?, 
                            server2  = ?, 
                            server3  = ?, 
                            likes = ?, 
                            un_likes = ?, 
                            average_likes = ?, 
                            time = ?,
                            source = ?
                        WHERE id = ?
                    `
                        , [
                            nameValue, slugValue, descriptionValue, imageValue,
                            actorId, countryId, server1Value, server2Value, server3Value,
                            likesValue, unLikesValue, avrLikesValue, formattedDate, id, sourceValue
                        ]
                    )
                        ;


                    // check views film
                    const queryViewsFilm = promisePool.execute(
                        `
                        select count(*) as views from views_film
                        where film_id = ?
                        `,
                        [id]
                    )


                    Promise.all([queryInsertGenres, queryViewsFilm, queryUpdateFilms])
                        .then(([queryInsertGenres, queryViewsFilm, queryUpdateFilms]) => {
                            const dbViewsFilm = queryViewsFilm[0][0].views

                            if (dbViewsFilm !== +viewsValue) {
                                if (+viewsValue < dbViewsFilm) {
                                    return res.json('Value must be greate than db!')
                                }

                                // insert views
                                const date = new Date();
                                const month = String(date.getMonth() - 5).padStart(2, '0'); // getMonth() trả về giá trị từ 0 (tháng 1) đến 11 (tháng 12), nên cần cộng thêm 1
                                const day = String(date.getDate()).padStart(2, '0');
                                const result = `${date.getFullYear()}${month}${day}`;
                                const greateThan = +viewsValue - dbViewsFilm
                                let arrViews = [];
                                for (let i = 1; i <= greateThan; i++) {
                                    arrViews.push(`(${id}, ${result})`)
                                }
                                const viewsArrount = arrViews.join(',')

                                const functInsertViews = async () => {
                                    const queryInsertViews = await promisePool.execute(
                                        `
                                        insert views_film (film_id, time)
                                        values ${viewsArrount}
                                        `,
                                        [id]
                                    )
                                }
                                functInsertViews()
                            }

                            res.status(200).json('Update films sucessfully!')
                        })
                })


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: put], [router: /admin/update-isread-error]
    async updateIsReadError(req, res, next) {
        try {
            const { idParams } = req.params

            const updateNotifyError = await promisePool.execute(
                `
                update notify_error set is_read = 1
                WHERE id = ?
                `,
                [idParams]
            )

            res.status(200).json('Update is read sucessfully!')
        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: delete], [router: /admin/delete-films]
    async deleteFilm(req, res, next) {
        try {
            const { id } = req.params

            console.log('id', id);

            const queryDeleteFilms = promisePool.execute(
                `
                delete from films where id = ?
                `,
                [id]
            )

            const queryDeleteGenres = promisePool.execute(
                `
                delete from genre_film where film_id = ?
                `,
                [id]
            )

            const queryDeleteViews = promisePool.execute(
                `
                delete from views_film where film_id = ?
                `,
                [id]
            )

            Promise.all([queryDeleteFilms, queryDeleteGenres, queryDeleteViews])



            res.status(200).json('Delete films succesfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: delete], [router: /admin/delete-genre]
    async deleteGenre(req, res, next) {
        try {
            const { genreId } = req.body

            const query = await promisePool.execute(
                `
                delete from genres where id = ?
                `,
                [genreId]
            )

            res.status(200).json('Delete genre succesfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: delete], [router: /admin/delete-actor]
    async deleteActor(req, res, next) {
        try {
            const { actorId } = req.body

            const query = await promisePool.execute(
                `
                delete from actors where id = ?
                `,
                [actorId]
            )

            res.status(200).json('Delete actor succesfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: delete], [router: /admin/delete-country]
    async deleteCountry(req, res, next) {
        try {
            const { countryId } = req.body

            const query = await promisePool.execute(
                `
                delete from countrys where id = ?
                `,
                [countryId]
            )

            res.status(200).json('Delete country succesfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }

    // [method: delete], [router: /admin/delete-notify-error/:idParams]
    async deleteNotifyError(req, res, next) {
        try {
            const { idParams } = req.params

            console.log('params', idParams);

            const query = await promisePool.execute(
                `
                delete from notify_error where id = ?
                `,
                [idParams]
            )

            res.status(200).json('Delete notify error succesfully!')


        } catch (err) {
            console.log(err)
            res.json('error')
        }
    }
}

export default new AdminControllers