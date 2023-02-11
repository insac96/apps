const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
  person_1: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  person_2: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  contents: [
    {
      person: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
      text: { type: String, required: true },
      time: { type: Date, default: Date.now(), required: true }
    }
  ]
})

module.exports = mongoose.model('Chats', ChatSchema)