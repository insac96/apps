import { Router } from 'express'
import { MW_Token } from '../../middlewares'
import * as Controller from './controller'

export const AuthRouter = Router()

AuthRouter.get('/', MW_Token, Controller.GetUserByAuth)
AuthRouter.post('/signin', Controller.SignIn)
AuthRouter.post('/signup', Controller.SignUp)
AuthRouter.get('/signout', Controller.SignOut)