import pool from '../configs/connectDb'
const promisePool = pool.promise();
import jwt from 'jsonwebtoken'

class TestControllers {
    // [method: get], [router: /]
    async test(req, res, next) {
        try {
            const a = await promisePool.execute(
                `
                    select avg(evaluate_user_film.film_id) as avg, count(evaluate_user_film.film_id) as count
                    from evaluate_user_film 
                    join evaluates on evaluates.id = evaluate_user_film.evaluate_id
                    where evaluate_user_film.film_id = ?
                    group by evaluate_user_film.film_id
                `,
                [7]
            )

            console.log('a', a)

            res.status(200).json('test sucessfully!')
        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /]
    async test2(req, res, next) {
        try {

            res.json('test2 sucessfully!')
        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /]
    async test3(req, res, next) {
        try {
            console.log('test3')
            console.log(req.cookies)

            res.json('test 3 sucessfully!')
        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

}

export default new TestControllers