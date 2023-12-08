import express from 'express'
import UsersControllers from '../controllers/UsersControllers'

const router = express.Router()

// upload avatar
export const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/avatar/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})
export const upload = multer({ storage: storage })

const usersRouter = () => {
    // get
    router.get('/history-film', UsersControllers.historyFilm)
    router.get('/followed-film', UsersControllers.followedFilm)
    router.get('/followed-only-film', UsersControllers.followedOnlyFilm)
    router.get('/list-evaluate', UsersControllers.listEvaluate)
    router.get('/list-notification', UsersControllers.listNotification)
    router.get('/notification', UsersControllers.notification)

    // post
    router.post('/log-in', UsersControllers.login)
    router.post('/log-in-google', UsersControllers.loginGoogle)
    router.post('/add-follow', UsersControllers.addFollow)
    router.post('/add-evaluate', UsersControllers.addEvaluate)
    router.post('/add-comment', UsersControllers.addComment)
    router.post('/add-rep-comment', UsersControllers.addRepComment)
    router.post('/add-history', UsersControllers.addHistory)
    router.post('/add-account', UsersControllers.addAccount)
    router.post('/validate-code-forgot-password', UsersControllers.validateCodeForgotPassword)
    router.post('/profile', upload.single('uploaded_file'), UsersControllers.profile)

    // put
    // change password
    router.put('/change-password', UsersControllers.changePassword)
    router.put('/change-password', UsersControllers.changePassword)
    router.put('/change-comment', UsersControllers.changeComment)
    router.put('/update-isread', UsersControllers.updateIsread)
    router.put('/change-rep-comment', UsersControllers.changeRepComment)
    router.put('/forgot-password', UsersControllers.forgotPassword)
    // update password while forgot password
    router.put('/update-password-forgot-password', UsersControllers.updatePasswordForgotPassword)

    // delete
    router.delete('/remote-follow', UsersControllers.remoteFollow)
    router.delete('/remote-history', UsersControllers.remoteHistory)
    router.delete('/remote-comment', UsersControllers.remoteComment)
    router.delete('/remote-rep-comment', UsersControllers.remoteRepComment)

    return router
}

export default usersRouter