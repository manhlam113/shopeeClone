/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HttpStatusCode from '../constants/httpCode'
import {
  clearLS,
  getAccessTokenToLocalStorage,
  getRefreshTokenToLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage,
  setRefreshTokenToLocalStorage
} from './utils.auth'
import { AuthResponse, ResponseRefreshToken } from '../types/auth.type'
import { URLRequest } from '../constants/url'
import { isAxiosExpireToken, isAxiosUnauthorized } from './utils'
import { ResponseApiFail } from '../types/utils.type'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private refreshAccessToken: Promise<any> | null
  constructor() {
    this.refreshAccessToken = null
    this.refreshToken = getRefreshTokenToLocalStorage()
    this.accessToken = getAccessTokenToLocalStorage()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
        // 'expire-access-token': 10,
        // 'expire-refresh-token': 60 * 60
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
        /*
        ** ở mỗi request kiểm tra có access_token lấy từ localStorage thì gán nó vào headers truyền lến
        server, tuy nhiên ở đây có kỹ thuật là lưu acces__token bằng kỹ thuật cache chứ k phải là 
        lấy trực tiếp từ localstorage => performance sẽ tốt hơn

        * */
        return config

        /**return config để cho tiếp tục gọi request
         *
         */
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
        if (url === URLRequest.login || url === URLRequest.register) {
          this.accessToken = (response.data as AuthResponse).data?.access_token
          this.refreshToken = (response.data as AuthResponse).data?.refresh_token
          /***
           * Nếu login và register thành công thì lấy access_tokem và refresh_token từ server để
           * set vào local, client lưu ở đây để mỗi lần call api gởi lên để xác thực
           *
           */
          setAccessTokenToLocalStorage(this.accessToken)
          setRefreshTokenToLocalStorage(this.refreshToken)
          setProfileToLocalStorage(response.data.data.user)
        } else if (url === URLRequest.logout) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        const url = error?.config?.url
        /**
         * Đây là functuion bắt lỗi chung trong axios
         *  câu if đầu tiên là nếu lỗi là lỗi liên quan đến 404 không phải là lỗi 422
         *  thì sẽ có toast ra ngoài giao diện
         *  ko thì promise.reject
         */
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (
            ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
              error.response?.status as number
            )
          ) {
            const data: any | undefined = error.response?.data
            const message = data?.message || error.message
            toast.error(message)
          }
        }
        if (isAxiosUnauthorized<ResponseApiFail<{ message: string; name: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          if (isAxiosExpireToken(error) && url !== '/refresh-access-token') {
            /**
             * Cách đặt cờ this.refreshAccessToekn ở đây là để hạn chế việc gọi lại refreshToken quá nhiều
             *  nếu website chúng ta có nhiều api cần truyền lên access_token, có bấy nhiêu thì gọi lại bấy nhiêu thì k tốt. Gắn cờ để kiểm tra nếu trước đó đã refreshtoken rồi thì ko cần nữa
             *
             *  Tuy nhiên pp2 này bị lỗi là nếu lỡ refresh_token đó trả về 1 access_token và cũng đã trải qua hết tgian nó sống. thì mỗi lần nó quay lịa kiểm tra cờ. Mà trước đó có rồi nên nó lấy lại access_token hết hạn đó gởi lên server
             * => lặp vô hạn
             * Giari pháp là sau đó gán cho nó lại bằng null
             */
            this.refreshAccessToken = this.refreshAccessToken
              ? this.refreshAccessToken
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshAccessToken = null
                  }, 10000)
                })
            return this.refreshAccessToken.then((access_token) => {
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''

          if (error.response?.data.message && error.response?.data.message === 'Token không được gửi') {
            toast.error('Vui lòng đăng nhập hoặc đăng ký tài khoản để thực hiện chức năng')
          } else {
            toast.error(error.response?.data.data?.message || error.response?.data.message)
          }
          // this.instance(error.response.config)
          /**Lỗi 401 có nhiều trường hợp
           *  1 là token heets hanj và url !==
           *
           *
           */
          // clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<ResponseRefreshToken>('/refresh-access-token', {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        this.accessToken = access_token
        setAccessTokenToLocalStorage(this.accessToken)
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}
const http = new Http().instance

export default http
