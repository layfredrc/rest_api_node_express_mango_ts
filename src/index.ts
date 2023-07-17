import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'

console.log('Hello TypeScript!')

const app = express()

app.use(
    cors({
        credentials: true,
    })
)

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

const server = http.createServer(app)

server.listen(8080, () => {
    console.log('Server listening on port 8080')
})

const MANGO_DB_URL =
    'mongodb+srv://layfred:layfred@cluster0.74jlph5.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise

mongoose.connect(MANGO_DB_URL)

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error', err)
})

app.use('/', router())
