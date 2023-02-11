import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import * as Routers from './routers'
import { MW_DB, MW_404, MW_End } from './middlewares'
import { ConnectMongoDB } from './utils'

// Env
dotenv.config()

// MongoDB
ConnectMongoDB()

// App
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.SERCET_AUTH))
app.use(MW_DB)

// Routers
app.use('/auth', Routers.AuthRouter)
app.use('/user', Routers.UserRouter)
app.use('/chat', Routers.ChatRouter)

// Middlewares
app.use(MW_404)
app.use(MW_End)

export default app