
export const MW_DB = (req, res, next) => {
  if(!!global.DBConnect) return next()

  next({
    error: true,
    status: 503,
    message: 'Cơ sở dữ liệu chưa được kết nối, vui lòng thử lại sau',
    at: 'db-connect'
  })
}