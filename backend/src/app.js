import express from 'express'
import path from 'path'
import routes from './routes'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.POST || 4000

// static
app.use('/public', express.static(path.join(__dirname, '../public')))

// cors
app.use(cors({
    origin:
        [
            'http://localhost:3000',
            'http://127.0.0.1:3000'
        ]
    ,
    credentials: true
}));

// cookie parser
app.use(cookieParser());

// receive body
app.use(express.json())
app.use(express.urlencoded())

// router
routes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})