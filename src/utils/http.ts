import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HttpStatusCode from '../constants/httpCode'
import { getAccessTokenToLocalStorage, setAccessTokenToLocalStorage } from './utils.auth'
import { AuthResponse } from '../types/auth.type'
import { clearAccessTokenAtLocalStorage } from './utils.auth'
import { error } from 'console'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenToLocalStorage()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    /**
     * Đây là interceptor của axios nó như bức tường ngăn giữa  sự giao tiếp của client and server
     *  khi server trả về không lỗi thì tiếp tục return response -> promise.resolve
     *  khi server trả về lỗi thì hàm này ()=> return Promise.rejected(error) để khi bên client
     *  ta có các tác vụ gọi api mà bị lỗi thì sẽ nhảy vào catch -> từ đó ta có thể toast nó ở catch
     *  hoặc bắt luôn ở interceptor này.
     *
     *
     */
    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers && this.accessToken) config.headers.authorization = this.accessToken
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthResponse).data?.access_token
          setAccessTokenToLocalStorage(this.accessToken)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearAccessTokenAtLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance

export default http
