import { upload } from '../routes/usersRouter';
import pool from '../configs/connectDb'
const promisePool = pool.promise();
const Mailjet = require('node-mailjet');
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// defined let random
let randomString;

class UsersControllers {
    // [method: post], [router: /users/log-in]
    async login(req, res, next) {
        try {
            const { account, password } = req.body

            const query = await promisePool.execute(
                `
                    select * from users where BINARY account = ?  and BINARY password = ?
                `,
                [account, password]
            )

            // where has error
            if (query[0].length === 0) {
                return res.json('Account not found!')
            }

            const { id: idHidden, admin } = query[0][0]

            const { password: pw, account: acc, id_google, ...rest } = query[0][0]

            // jwt
            const token = jwt.sign({
                userId: idHidden,
                admin: admin
            },
                process.env.ACCESTOKEN, {
                expiresIn: '2h'
            });

            // create cookie
            await res.cookie('accestoken', token, {
                httpOnly: true,
                secure: true,
                sameSite: true
            })

            res.json({ ...rest, accestoken: token })
        } catch (err) {
            console.log(err)
            res.json('Login failed')
        }
    }

    // [method: post], [router: /users/log-in-google]
    async loginGoogle(req, res, next) {
        try {
            const { id, email, name, picture } = req.body

            let query2;

            const checkId = await promisePool.execute(
                `
                SELECT * FROM users where id_google = ?
                `,
                [id]
            );

            if (checkId[0].length === 0) {
                // add account
                await promisePool.execute(
                    `
                    insert users (name, email, avatar, id_google)
                    values 
                    (?, ?, ?, ?)
                    `,
                    [name, email, picture, id]
                );

                query2 = await promisePool.execute(
                    `
                    select * from users where id_google = ?
                    `,
                    [id]
                );


            } else {
                // login
                query2 = await promisePool.execute(
                    `
                    select * from users where id_google = ?
                    `,
                    [id]
                )

            }

            const result = query2[0][0];

            // // defined constant
            const { id: idHidden, admin } = result;

            const { password: pw, account: acc, id_google, ...rest } = result

            // jwt
            const token = jwt.sign({
                userId: idHidden,
                admin: admin
            },
                process.env.ACCESTOKEN, {
                expiresIn: '2h'
            });

            // create cookie
            await res.cookie('accestoken', token, {
                httpOnly: true,
                secure: true,
                sameSite: true
            })

            res.json({ ...rest, accestoken: token })


        } catch (err) {
            console.log(err)
            res.json('Login failed!')
        }
    }

    // [method: post], [router: /users/add-evaluate]
    async addEvaluate(req, res, next) {
        try {
            const { userId, filmId, evaluateId } = req.body

            // check evaluate
            const checkEvaluate = await promisePool.execute(
                `
                select * from evaluate_user_film where film_id = ? and user_id = ?
                `,
                [filmId, userId]
            )

            if (checkEvaluate[0].length === 0) {
                await promisePool.execute(
                    `
                    insert evaluate_user_film (film_id, user_id, evaluate_id)
                    values 
                    ( ?, ?, ? )
                    `,
                    [filmId, userId, evaluateId]
                )
                res.json('Add evaluate Sucess')
            } else {
                await promisePool.execute(
                    `
                    update evaluate_user_film set evaluate_id = ?
                    WHERE user_id = ? and film_id = ?
                    `,
                    [evaluateId, userId, filmId]
                )

                res.json('Update evaluate Sucess')
            }
        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-comment]
    async addComment(req, res, next) {
        try {
            const { filmId, userId, episode, content } = req.body

            await promisePool.execute(
                `
                insert comment_user_film (film_id, user_id, episode, content)
                values 
                (?, ?, ?, ?)
                `,
                [filmId, userId, episode, content]
            )

            res.json('Add comment sucessfully!')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-rep-comment]
    async addRepComment(req, res, next) {
        try {
            const { userId, content, idCommentFilm } = req.body

            await promisePool.execute(
                `
                insert rep_comment (user_id, content, id_comment_film)
                values 
                (?, ?, ?)
                `,
                [userId, content, idCommentFilm]
            )

            res.json('Add rep comment sucessfully!')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/history-film]
    async historyFilm(req, res, next) {
        try {
            const userId = req.query.userId

            const query = await promisePool.execute(
                `
                select films.id, films.name, history_film.time_view, history_film.episode, history_film.user_id, films.image
                from history_film
                join episode_film on episode_film.episode = history_film.episode and history_film.film_id = episode_film.film_id
                join users on history_film.user_id = users.id
                join films on history_film.film_id = films.id
                where history_film.user_id = ?
                order by history_film.time_view desc
                limit 10
                `,
                [userId]
            )

            res.json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/followed-film]
    async followedFilm(req, res, next) {
        try {
            const userId = req.query.userId

            const query1 = promisePool.execute(
                `
                select films.name, films.description, films.movie_duration, films.number_episodes, films.year, films.image, films.id,
                max(episode_film.episode) as current_episode
                from followed_film
                join users on users.id = followed_film.user_id
                join films on films.id = followed_film.film_id
                join episode_film on films.id = episode_film.film_id
                where followed_film.user_id = ?
                group by films.name, films.description, films.movie_duration, films.number_episodes, films.year, films.image, films.id
                `,
                [userId]
            )

            const query2 = promisePool.execute(
                `
                select evaluate_user_film.film_id, cast(avg(evaluate_user_film.evaluate_id) as decimal(3,1)) as medium_point
                from evaluate_user_film
                join films on films.id = evaluate_user_film.film_id
                where evaluate_user_film.film_id in ( select film_id from followed_film where user_id = ? )
                group by evaluate_user_film.film_id
                `,
                [userId]
            )


            Promise.all([query1, query2]).then((data) => {
                let followedFilm = data[0][0];
                let mediumPoint = data[1][0];

                function addMediumPoint(followedFilm, mediumPoint) {
                    let updatedFollowedFilm = followedFilm.map((film) => {
                        let match = mediumPoint.find((point) => point.film_id === film.id);

                        if (match) {
                            film.mediumPoint = match.medium_point;
                        } else {
                            film.mediumPoint = null
                        }

                        return film;
                    });

                    return updatedFollowedFilm;
                }

                // Gọi hàm addMediumPoint và lưu kết quả vào biến result
                let result = addMediumPoint(followedFilm, mediumPoint);

                res.json(result)
            })


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/change-password]
    async changePassword(req, res, next) {
        try {
            const userId = req.body.userId
            const currentPassword = req.body.currentPassword
            const newPassword = req.body.newPassword

            const query = await promisePool.execute(
                `
                 select password from users where id = ?
                `,
                [userId]
            )

            if (query[0][0].password === currentPassword) {
                const updataPassword = await promisePool.execute(
                    `
                    update users set password = '${newPassword}'
                    WHERE id = ?
                    `,
                    [userId]
                )

                res.json('Success')
            } else {
                res.json('Failer')
            }


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/update-password-forgot-password]
    async updatePasswordForgotPassword(req, res, next) {
        try {
            const { account, password } = req.body

            const checkAccount = await promisePool.execute(
                `
                SELECT account FROM users where account = '${account}'
                `
            )

            if (checkAccount[0].length === 0) {
                res.json('Account not found!')
            } else {
                const query = await promisePool.execute(
                    `
                        update users set password = '${password}'
                        WHERE account = binary '${account}'
                    `
                )
                res.json('Password changed successfully!')

            }


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/change-comment]
    async changeComment(req, res, next) {
        try {
            const { commentId, content } = req.body

            const query = await promisePool.execute(
                `
                update comment_user_film set content = '${content}'
                WHERE id = ${commentId}
                `
            )

            res.json('Update comment sucessfully!')


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/update-isread]
    async updateIsread(req, res, next) {
        try {
            const { id } = req.body

            const query = await promisePool.execute(
                `
                update notifycation set is_read = 1
                WHERE id = ?
                `,
                [id]
            )

            res.status(200).json('Update isread succesfully!')


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/change-rep-comment]
    async changeRepComment(req, res, next) {
        try {
            const { id, content } = req.body

            const query = await promisePool.execute(
                `
                update rep_comment set content = '${content}'
                WHERE id = ${id}
                `
            )

            res.json('Update rep comment sucessfully!')


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/forgot-password]
    async forgotPassword(req, res, next) {
        try {
            const { email, account } = req.body

            const checkAccount = await promisePool.execute(
                `
                SELECT account FROM users where account = binary '${account}'
                `
            )

            if (checkAccount[0].length === 0) {
                res.json('Not find account!')
            } else {

                const checkEmail = await promisePool.execute(
                    `
                    SELECT * FROM users where account = '${account}' and email = binary '${email}'
                    `
                )

                if (checkEmail[0].length === 0) {
                    res.json('Email does not match account!')
                } else {
                    // code defined password
                    randomString = Math.random().toString(36).substring(2, 10);

                    const mailjet = Mailjet.apiConnect(
                        process.env.MJ_APIKEY_PUBLIC,
                        process.env.MJ_APIKEY_PRIVATE,
                    );

                    const request = mailjet
                        .post('send', { version: 'v3.1' })
                        .request({
                            Messages: [
                                {
                                    From: {
                                        Email: process.env.EMAIL_HOST,
                                        Name: "Web Animehay"
                                    },
                                    To: [
                                        {
                                            Email: email,
                                            Name: email
                                        }
                                    ],
                                    Subject: "forget password",
                                    HTMLPart: `
                            <h2>This is the code to confirm the password<h2/>
                            <button>${randomString}</button>
                            `
                                }
                            ]
                        })

                    request
                        .then((result) => {
                            res.json('Account found!')
                        })
                        .catch((err) => {
                            res.json(err.statusCode)
                        })
                }
            }

        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-history]
    async addHistory(req, res, next) {
        try {
            const userId = req.body.userId
            const filmId = req.body.filmId
            const episode = req.body.episode

            const query = await promisePool.execute(
                `
                select film_id from history_film
                where film_id = ? and user_id = ? and episode = ?
                `,
                [filmId, userId, episode]
            )

            if (query[0].length === 0) {
                const query = await promisePool.execute(
                    `
                    insert history_film (film_id, episode, user_id)
                    values 
                    (?, ?, ?)
                    `,
                    [filmId, episode, userId]
                )

                res.json('Add history sucess');

            } else {
                const query = await promisePool.execute(
                    `
                    update history_film set time_view = current_timeStamp
                    WHERE user_id = ? and film_id = ? and episode = ?
                    `,
                    [userId, filmId, episode]
                )

                res.json('Update history sucess');
            }

        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-account]
    async addAccount(req, res, next) {
        try {
            const { account, email, password } = req.body

            const checkAccount = await promisePool.execute(
                `
                select * from users where account = binary '${account}'
                `
            )

            if (checkAccount[0].length !== 0) {
                res.json('Account already exists')
            } else {
                const quer = await promisePool.execute(
                    `
                        insert users (email, password, lever, account, experience, coint)
                        values 
                        ('${email}', '${password}', 0, '${account}', 0, 0)
                    `
                )

                res.json('Create account sucess')

            }


        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/validate-code-forgot-password]
    async validateCodeForgotPassword(req, res, next) {
        try {
            const { code } = req.body

            console.log(code, randomString)

            if (code === randomString) {
                res.json('Verified successfully!')
            } else {
                res.json('Verification code is incorrect!')
            }


        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/followed-only-film]
    async followedOnlyFilm(req, res, next) {
        try {
            const { userId = null, filmId } = req.query

            const query = await promisePool.execute(
                `
                select * from followed_film where film_id = ? and user_id = ?
                `,
                [userId, filmId]
            )

            res.json(query[0])


        } catch (err) {
            // console.log(err)
            console.log('xin chao')
        }
    }

    // [method: post], [router: /users/profile]
    async profile(req, res, next) {
        try {

            if (req.file === undefined) {
                res.json('Bạn chưa chọn cảnh')
            }

            const avatar = `http://127.0.0.1:${process.env.POST}/${req.file.destination}${req.file.filename}`

            const userId = req.body.userId

            const query = await promisePool.execute(
                `
                update users set avatar = '${avatar}'
                WHERE id = ?
                `,
                [userId]
            )

            res.json({ notify: 'Update file Sucessfully!', avatar: avatar })

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/list-evaluate]
    async listEvaluate(req, res, next) {
        try {

            const query = await promisePool.execute(
                `
                select id from evaluates
                `
            )

            res.json(query[0])


        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/list-notification ]
    async listNotification(req, res, next) {
        try {

            const { userId } = req.query

            const query = await promisePool.execute(
                `
                select * from notifycation where user_id = ? order by time desc
                `,
                [userId]
            )

            res.json(query[0])


        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/notification ]
    async notification(req, res, next) {
        try {

            const { id } = req.query

            const query = await promisePool.execute(
                `
                select * from notifycation where id = ?
                `,
                [id]
            )

            res.json(query[0])


        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-follow]
    async addFollow(req, res, next) {
        try {
            const userId = req.body.userId
            const filmId = req.body.filmId

            const query = await promisePool.execute(
                `
                insert followed_film (film_id, user_id)
                values 
                (?, ?)
                `,
                [filmId, userId]
            )

            res.json('Sucess')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: delete], [router: /users/remote-follow]
    async remoteFollow(req, res, next) {
        try {
            const userId = req.body.userId
            const filmId = req.body.filmId

            const query = await promisePool.execute(
                `
                delete from followed_film
                where film_id = ? and user_id = ?
                `,
                [filmId, userId]
            )

            res.json('Delete Sucess')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: delete], [router: /users/remote-history]
    async remoteHistory(req, res, next) {
        try {
            const userId = req.body.userId

            const query = await promisePool.execute(
                `
                select * from history_film where user_id = ? order by time_view desc
                `,
                [userId]
            )

            if (query[0].length > 100) {
                const query = await promisePool.execute(
                    `
                    DELETE FROM history_film
                    WHERE time_view IN (
                        SELECT time_view FROM (
                            SELECT time_view FROM history_film WHERE user_id = ? ORDER BY time_view ASC LIMIT 70
                        ) AS tmp
                    )
                    AND user_id = ?

                    `,
                    [userId, userId]
                )
            }

            res.json('Delete Sucess')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: delete], [router: /users/remote-comment]
    async remoteComment(req, res, next) {
        try {
            const { commentId } = req.body

            const query1 = promisePool.execute(
                `
                DELETE from rep_comment
                where id_comment_film = ${commentId}
                `
            )

            const query2 = promisePool.execute(
                `
                DELETE from comment_user_film
                where id = ${commentId}
                `
            )

            Promise.all([query1, query2]).then(() => {
                res.json('Delete comment sucessfully!')
            })

        } catch (err) {
            console.log(err)
        }
    }

    // [method: delete], [router: /users/remote-rep-comment]
    async remoteRepComment(req, res, next) {
        try {
            const { id } = req.body

            const query1 = promisePool.execute(
                `
                delete from rep_comment
                where id = ${id}
                `
            )
            res.json('Delete rep comment sucessfully!')

        } catch (err) {
            console.log(err)
        }
    }
}

export default new UsersControllers