import md5 from 'md5'
import { CreateToken, CreateCookie, RemoveCookie } from '../../utils'
const UserDB = require('../../database/_user')

// Get User By Auth
export const GetUserByAuth = async (req, res, next) => {
  try {
    const { username } = req.auth

    // Get User by Username and Check
    const user = await UserDB
    .findOne({'auth.username': username})
    .select('-auth.password')
    .exec()

    if(!user) throw { message: 'Tài khoản xác thực không tồn tại' }

    // End
    next({ result: user, message: 'Xác thực thành công' })
  }
  catch (err) {
    next({ error: true, status: 401, at: 'auth-get', ...err })
  }
}

// Sign In
export const SignIn = async (req, res, next) => {
  try {
    const { username, password } = req.body
    
    // Get User by Username and Check
    const user = await UserDB
    .findOne({'auth.username': username})
    .select('auth')
    .exec()

    if(!user) throw { message: 'Tài khoản này không tồn tại' }
    if(user.auth.password !== md5(password)) throw { message: 'Mật khẩu không chính xác' }

    // New Token
    const newToken = CreateToken({
      id: user._id,
      username: user.auth.username,
      role: user.auth.role
    })

    // New Cookie
    CreateCookie({
      key: 'token',
      value: newToken
    }, res)

    // End
    next({ message: 'Đăng nhập thành công' })
  }
  catch (err) {
    next({ error: true, at: 'auth-sign-in', ...err })
  }
}

// Sign Up
export const SignUp = async (req, res, next) => {
  try {
    const { username, password } = req.body
    
    // Get User by Username and Check
    const user = await UserDB
    .findOne({'auth.username': username})
    .select('auth')
    .exec()

    if(!!user) throw { message: 'Tài khoản này đã tồn tại' }

    // New User
    const newUser = new UserDB({
      auth: {
        username: username,
        password: md5(password)
      }
    })

    // New Token
    const newToken = CreateToken({
      id: newUser._id,
      username: newUser.auth.username,
      role: newUser.auth.role
    })

    // Save New User
    await newUser.save()
    
    // New Cookie
    CreateCookie({
      key: 'token',
      value: newToken
    }, res)

    // End
    next({ message: 'Đăng ký thành công' })
  }
  catch (err) {
    next({ error: true, at: 'auth-sign-up', ...err })
  }
}

// Sign Out
export const SignOut = async (req, res, next) => {
  RemoveCookie('token', res)
  next({ message: 'Đăng xuất thành công' })
}