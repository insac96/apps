export const MW_End = (data, req, res, next) => {
  res.status(200)
  res.json({
    status: data.status || 200,
    error: data.error,
    message: data.message,
    at: data.at,
    result: data.result
  })
  res.end()
}