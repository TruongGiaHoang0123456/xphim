import express from 'express'
import TestControllers from '../controllers/TestControllers'

const router = express.Router()

const testRouter = () => {
    router.get('/', TestControllers.test)
    router.get('/2', TestControllers.test2)
    router.get('/3', TestControllers.test3)

    return router
}

export default testRouter