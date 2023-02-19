const UserDB = require('../../database/_user')
const ChatDB = require('../../database/_chat')

// Get All Chat
export const GetChats = async (req, res, next) => {
  try {
    const { id } = req.auth

    const chats = await ChatDB
    .find(
      { $or: [{ person_1: id }, { person_2: id }] },
      { contents: { $slice: -1 } }
    )
    .populate({ path: 'person_1', select: 'profile' })
    .populate({ path: 'person_2', select: 'profile' })
    .exec()

    next({ result: chats, message: 'Lấy danh sách cuộc trò chuyện thành công' })
  }
  catch (err) {
    next({ error: true, at: 'get-chats', ...err })
  }
}

// Get Chat By ID
export const GetChatByID = async (req, res, next) => {
  try {
    const { id } = req.auth
    const { chatID } = req.params

    const chat = await ChatDB
    .findById(chatID)
    .populate({ path: 'person_1', select: 'profile' })
    .populate({ path: 'person_2', select: 'profile' })
    .exec()

    if(!chat) throw { status: 404, message: 'Cuộc trò chuyện không tồn tại' }
    if(chat.person_1._id != id && chat.person_2._id != id) throw { status: 403, message: 'Bạn không được phép truy cập cuộc trò chuyện này' }

    next({ result: chat, message: 'Lấy dữ liệu cuộc trò chuyện thành công' })
  }
  catch (err) {
    next({ error: true, at: 'get-chat', ...err })
  }
}

// Create New Chat
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

    next({ result: newChat._id, message: 'Khởi tạo cuộc trò chuyện thành công' })
  }
  catch (err) {
    next({ error: true, at: 'get-chat', ...err })
  }
}

// Remove Chat
export const RemoveChat = async (req, res, next) => {
  try {
    const { id } = req.auth
    const { chatID } = req.body

    const chat = await ChatDB
    .findById(chatID)
    .select('_id person_1 person_2')
    .exec()

    if(!chat) throw { status: 404, message: 'Cuộc trò chuyện không tồn tại' }
    if(chat.person_1 != id && chat.person_2 != id) throw { status: 403, message: 'Bạn không được phép truy cập cuộc trò chuyện này' }

    await ChatDB.deleteOne({ '_id': chatID })

    next({ message: 'Xóa cuộc trò chuyện thành công' })
  }
  catch (err) {
    next({ error: true, at: 'get-chat', ...err })
  }
}

// Create New Content Of Chat
export const CreateContent = async (req, res, next) => {
  try {
    const { id } = req.auth
    const { chatID, person, text } = req.body

    if(!text) throw { message: 'Nội dung đang để trống' } 

    const chat = await ChatDB
    .findById(chatID)
    .exec()

    if(!chat) throw { status: 404, message: 'Cuộc trò chuyện không tồn tại' }
    if(chat.person_1 != id && chat.person_2 != id) throw { status: 403, message: 'Bạn không được phép truy cập cuộc trò chuyện này' }
    
    chat.contents.push({
      person: !!person ? person : id,
      text: text,
    })
    await chat.save()

    const newContent = chat.contents[chat.contents.length - 1]
    chat.update = newContent.time
    await chat.save()

    next({ result: newContent, message: 'Gửi tin nhắn thành công' })
  }
  catch (err) {
    next({ error: true, at: 'get-chat', ...err })
  }
}

// Remove Content Of Chat
export const RemoveContent = async (req, res, next) => {
  try {
    const { id } = req.auth
    const { chatID, contentID } = req.body

    const chat = await ChatDB
    .findById(chatID)
    .select('_id person_1 person_2')
    .exec()

    if(!chat) throw { status: 404, message: 'Cuộc trò chuyện không tồn tại' }
    if(chat.person_1 != id && chat.person_2 != id) throw { status: 403, message: 'Bạn không được phép truy cập cuộc trò chuyện này' }

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

