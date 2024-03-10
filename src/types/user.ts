export interface AuthUserRegisterBody {
  username: string
  email: string
  password: string
  recaptcha_token?: string
}
