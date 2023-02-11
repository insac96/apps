import { Router } from 'express'
import { MW_Token } from '../../middlewares'
import * as Controller from './controller'

export const ChatRouter = Router()

ChatRouter.get('/get/list', MW_Token, Controller.GetChats)
ChatRouter.get('/get/:chatID', MW_Token, Controller.GetChatByID)
ChatRouter.post('/create', MW_Token, Controller.CreateChat)
ChatRouter.post('/remove', MW_Token, Controller.RemoveChat)
ChatRouter.post('/content/create', MW_Token, Controller.CreateContent)
ChatRouter.post('/content/remove', MW_Token, Controller.RemoveContent)

