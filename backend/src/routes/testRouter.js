import express from 'express'
import TestControllers from '../controllers/TestControllers'

const router = express.Router()

const testRouter = () => {
    router.get('/', TestControllers.test)

    return router
}

export default testRouter