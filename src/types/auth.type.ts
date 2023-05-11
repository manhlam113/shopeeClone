import { User } from './user.type'
import { ResponseApiSuccess } from './utils.type'

export type AuthResponse = ResponseApiSuccess<{
  access_token: string
  expires: string
  user: User
}>
