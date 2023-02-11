const UserDB = require('../../database/_user')

export const GetUsers = async (req, res, next) => {
  try {
    const users = await UserDB
    .find({})
    .select('-auth')
    .exec()

    next({ result: users })
  }
  catch (err) {
    next({ error: true, at: 'get-users', ...err })
  }
}