import { verify, sign } from 'jsonwebtoken'

// Create Token
export const CreateToken = (data) => {
  try {
    const token = sign({ data }, process.env.SERCET_AUTH, { expiresIn: '7d' });

    return token
  }
  catch (err) {
    throw { message: 'Không thể tạo mã Token'}
  }
}

// Verify Token
export const VerifyToken = (token) => {
  try {
    const decoded = verify(token, process.env.SERCET_AUTH)

    return decoded
  }
  catch (err) {
    throw { message: 'Không thể xác minh Token' }
  }
}