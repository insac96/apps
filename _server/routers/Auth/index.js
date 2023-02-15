import { Router } from 'express'
import { MW_Token } from '../../middlewares'
import * as Controller from './controller'
import * as Validate from './validate'

export const AuthRouter = Router()

AuthRouter.get('/', MW_Token, Controller.GetUserByAuth)
AuthRouter.post('/signin', Validate.SignIn(), Controller.SignIn)
AuthRouter.post('/signup', Validate.SignUp(), Controller.SignUp)
AuthRouter.get('/signout', Controller.SignOut)