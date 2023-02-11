export const MW_404 = (req, res, next) => {
  next({
    error: true,
    status: 404,
    message: 'Địa chỉ API không tồn tại',
    at: 'api-uri'
  })
}