// Get Cookie
export const GetCookie = (key, req) => {
  return req.cookies[key]
}

// Get Cookie Signed
export const GetCookieSigned = (key, req) => {
  return req.signedCookies[key]
}

// Create Cookie
export const CreateCookie = ({ key, value, option = {} }, res) => {
  res.cookie(key, value, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    signed: true,
    ...option
  })
}

// Remove Cookie
export const RemoveCookie = (key, res) => {
  res.clearCookie(key)
}



