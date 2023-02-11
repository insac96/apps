import { Router } from 'express'
import { MW_Token } from '../../middlewares'
import * as Controller from './controller'

export const UserRouter = Router()

UserRouter.get('/list', Controller.GetUsers)
