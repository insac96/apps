const UserDB = require('../../database/_user')
const ChatDB = require('../../database/_chat')

export const GetChats = async (req, res, next) => {
  try {
    const { id } = req.auth

    const chats = await ChatDB
    .find({
      $or: [{ person_1: id }, { person_2: id }]
    })
    .populate({ path: 'person_1', select: 'profile' })
    .populate({ path: 'person_2', select: 'profile' })
    .exec()

    const newList = chats.map(item => {
      if(item.person_1._id == id){
        item.person = item.person_2
      }
      else if(item.person_2._id == id){
        item.person = item.person_1
      }

      return {
        _id: item._id,
        person: item.person,
        content: item.contents[item.contents.length - 1]
      }
    })

    next({ result: newList })
  }
  catch (err) {
    next({ error: true, at: 'get-chats', ...err })
  }
}

export const GetChatByID = async (req, res, next) => {
  try {
    const { id } = req.auth
    const { chatID } = req.params

    const chat = await ChatDB
    .findById(chatID)
    .populate({ path: 'person_1', select: 'profile' })
    .populate({ path: 'person_2', select: 'profile' })
    .exec()

    if(!chat) throw { message: 'Cuộc trò chuyện không tồn tại' }
    if(chat.person_1._id != id && chat.person_2._id != id) throw { message: 'Bạn không được phép truy cập cuộc trò chuyện này' }

    next({ result: chat })
  }
  catch (err) {
    next({ error: true, at: 'get-chat', ...err })
  }
}

export const CreateChat = async (req, res, next) => {
  try {
    const { id } = req.auth
    const { person } = req.body

    const chat = await ChatDB
    .findOne({
      $or: [
        { person_1: id, person_2: person }, 
        { person_1: person, person_2: id }
      ]
    })
    .select('_id')
    .exec()

    if(!!chat) return next({ result: chat._id })

    const newChat = new ChatDB({
      person_1: id,
      person_2: person
    })

    await newChat.save()

    next({ result: newChat._id })
  }
  catch (err) {
    next({ error: true, at: 'get-chat', ...err })
  }
}

export const RemoveChat = async (req, res, next) => {
  try {
    const { id } = req.auth
    const { chatID } = req.body

    const chat = await ChatDB
    .findById(chatID)
    .select('_id person_1 person_2')
    .exec()

    if(!chat) throw { message: 'Cuộc trò chuyện không tồn tại' }
    if(chat.person_1 != id && chat.person_2 != id) throw { message: 'Bạn không được phép truy cập cuộc trò chuyện này' }

    await ChatDB.deleteOne({ '_id': chatID })

    next({ message: 'Xóa cuộc trò chuyện thành công' })
  }
  catch (err) {
    next({ error: true, at: 'get-chat', ...err })
  }
}

export const CreateContent = async (req, res, next) => {
  try {
    const { id } = req.auth
    const { chatID, person, text } = req.body

    const chat = await ChatDB
    .findById(chatID)
    .exec()

    if(!chat) throw { message: 'Cuộc trò chuyện không tồn tại' }
    if(chat.person_1 != id && chat.person_2 != id) throw { message: 'Bạn không được phép truy cập cuộc trò chuyện này' }

    chat.contents.push({
      person: !!person ? person : id,
      text: text,
    })
    await chat.save()

    const newContent = chat.contents[chat.contents.length - 1]

    next({ result: newContent, message: 'Gửi tin nhắn thành công' })
  }
  catch (err) {
    next({ error: true, at: 'get-chat', ...err })
  }
}

export const RemoveContent = async (req, res, next) => {
  try {
    const { id } = req.auth
    const { chatID, contentID } = req.body

    const chat = await ChatDB
    .findById(chatID)
    .select('_id person_1 person_2')
    .exec()

    if(!chat) throw { message: 'Cuộc trò chuyện không tồn tại' }
    if(chat.person_1 != id && chat.person_2 != id) throw { message: 'Bạn không được phép truy cập cuộc trò chuyện này' }

    await ChatDB.updateOne(
      { '_id': chatID }, 
      { $pull: { 'contents': { '_id': contentID } } }
    )
    
    next({ message: 'Xóa tin nhắn thành công' })
  }
  catch (err) {
    next({ error: true, at: 'get-chat', ...err })
  }
}
