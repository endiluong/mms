export const passwordValidator = {
  pattern: {
    value: "^[A-Za-z0-9]+$",
    errorMessage: "Mật khẩu sai định dạng",
  },
  required: {
    value: true,
    errorMessage: "Vui lòng nhập mật khẩu",
  },
  minLength: {
    value: 8,
    errorMessage: "Mật khẩu phải có ít nhất 8 ký tự và nhiều nhất 33 ký tự",
  },
  maxLength: {
    value: 33,
    errorMessage: "Mật khẩu phải có ít nhất 8 ký tự và nhiều nhất 33 ký tự",
  },
};
export const userNameValidator = {
  required: {
    value: true,
    errorMessage: "Vui lòng nhập tên đăng nhập",
  },
};
