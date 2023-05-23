import { AuthResponse } from '../types/auth.type'
import { ResponseApiSuccess } from '../types/utils.type'
import http from '../utils/http'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>('/register', body)
  },
  loginAccount: (body: { email: string; password: string }) => {
    return http.post<AuthResponse>('/login', body)
  },
  logOut: () => {
    return http.post('/logout')
  },
  refreshToken: (body: { refresh_token: string }) => {
    return http.post<ResponseApiSuccess<{ access_token: string }>>('/refresh-access-token', body)
  }
}
export default authApi
