import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HttpStatusCode from '../constants/httpCode'
import { getAccessTokenToLocalStorage, setAccessTokenToLocalStorage, setProfileToLocalStorage } from './utils.auth'
import { AuthResponse } from '../types/auth.type'
import { clearLS } from './utils.auth'
import { error } from 'console'
import { path } from '../constants/path'
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
    //interceptor của request thì ko cần phân biệt url là login hay register bởi vì
    /* các url khác mà cần token để authenticated nên ta sẽ viết nó 1 cách bao quát
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
        /**
         * tại sao phải Promise.reject(error) => để khi nó lỗi nó sẽ nhảy vào catch của các tác vụ promise
         * để bắt lỗi
         *
         */
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        /**
         * ở đây mình kiểm tra url bởi vì 2 tác vụ login và register sẽ trả về token
         *  tại đây mình sẽ set nó ở localstorage
         *
         */
        if (url === path.login || url === path.register) {
          this.accessToken = (response.data as AuthResponse).data?.access_token
          setAccessTokenToLocalStorage(this.accessToken)
          setProfileToLocalStorage(response.data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        /**
         * Đây là functuion bắt lỗi chung trong axios
         *  câu if đầu tiên là nếu lỗi là lỗi liên quan đến 404 không phải là lỗi 422
         *  thì sẽ có toast ra ngoài giao diện
         *  ko thì promise.reject
         */
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance

export default http
