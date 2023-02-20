const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  auth: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'MEMBER' }
  },
  profile: {
    name: { type: String, required: true, unique: true, default: function () {
      return this.auth.username
    }},
    email: { type: String, required: true, default: function () {
      return `${this.auth.username}@app.com`
    }},
    avatar: { type: String }
  },
  created: { type: Date, default: Date.now },
  coin: { type: Number, default: 10000 }
})

module.exports = mongoose.model('Users', UserSchema)