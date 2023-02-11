import { VerifyToken, GetCookieSigned } from '../utils'

export const MW_Token = (req, res, next) => {
	try {
		// Get and Check Token From Cookie
		const token = GetCookieSigned('token', req)
		if(!token) throw { message: 'Bạn chưa đăng nhập trước đó' }
		
		// Decoded Token
		const decoded = VerifyToken(token)
		
		// Set Auth and Next
		req.auth = decoded.data
		next()
	}
	catch(err) {
		next({ error: true, status: 401, at: 'token-verify', ...err })
	}
}