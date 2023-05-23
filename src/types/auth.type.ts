import { User } from './user.type'
import { ResponseApiSuccess } from './utils.type'

export type AuthResponse = ResponseApiSuccess<{
  access_token: string
  refresh_token: string
  expires: string
  user: User
}>

export type ResponseRefreshToken = ResponseApiSuccess<{
  access_token: string
}>
