import { body } from 'express-validator'

export const SignIn = () => {
  return [
    body('username')
    .notEmpty().withMessage('Tài khoản đang để trống').bail()
    .isString().withMessage('Định dạng đầu vào không hợp lệ').bail()
    .not().matches(/\s/g).withMessage('Không được có khoảng trắng')
    ,

    body('password')
    .notEmpty().withMessage('Mật khẩu đang để trống').bail()
    .isString().withMessage('Định dạng đầu vào không hợp lệ').bail()
    .not().matches(/\s/g).withMessage('Không được có khoảng trắng'),
  ]
}

export const SignUp = () => {
  return [
    body('username')
    .notEmpty().withMessage('Tên tài khoản đang để trống').bail()
    .isString().withMessage('Định dạng đầu vào không hợp lệ').bail()
    .not().matches(/\s/g).withMessage('Tên tài khoản không được có khoảng trắng')
    .isLength({ min: 5 }).withMessage('Tên tài khoản tối thiểu 5 ký tự')
    ,

    body('password')
    .notEmpty().withMessage('Mật khẩu đang để trống').bail()
    .isString().withMessage('Định dạng đầu vào không hợp lệ').bail()
    .not().matches(/\s/g).withMessage('Mật khẩu không được có khoảng trắng')
    .isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự')
    .matches(/[A-Z]/g).withMessage('Mật khẩu tối thiểu có 1 ký tự viết hoa')
    .matches(/\d/g).withMessage('Mật khẩu tối thiểu có 1 chữ số')
  ]
}

//matches(/\d/),
//isLength({ min: 5 })