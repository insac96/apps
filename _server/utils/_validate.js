import { validationResult } from "express-validator"

export const ValidateCheck = (req) => {
  const result = validationResult(req)
  .formatWith(({ msg }) => {
    return msg
  })
  .array({
    onlyFirstError: true
  })

  if(result.length > 0) throw { message: result[0] }
} 