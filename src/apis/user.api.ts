import { User } from '../types/user.type'
import { ResponseApiSuccess } from '../types/utils.type'
import http from '../utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const URL = 'user'
export const userApi = {
  getUserProfile: () => {
    return http.get<ResponseApiSuccess<User>>('me')
  },
  updateProfile: (body: BodyUpdateProfile) => {
    return http.put<ResponseApiSuccess<User>>(URL, body)
  },
  uploadAvatarProfile: (body: FormData) => {
    return http.post<ResponseApiSuccess<string>>(`${URL}/upload-avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
