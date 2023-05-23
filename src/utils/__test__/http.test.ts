import { describe, expect, it, beforeEach } from 'vitest'
import HttpStatusCode from '../../constants/httpCode'
import { setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from '../utils.auth'
import http, { Http } from '../http'
const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWEyZDE4MWZhN2Q2MDMzOGJmYjIyMiIsImVtYWlsIjoibWFuaHZhbmxhbTA2OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0yMVQwNzoyNjo0OC44NTJaIiwiaWF0IjoxNjg0NjU0MDA4LCJleHAiOjE2ODQ2NTQwMDl9.TvWIAkdLWB9XSAtQMp9-zRCqQzqsYn2yzo7Yd_tQAes'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWEyZDE4MWZhN2Q2MDMzOGJmYjIyMiIsImVtYWlsIjoibWFuaHZhbmxhbTA2OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0yMVQwNzoyNjo0OC44NTJaIiwiaWF0IjoxNjg0NjU0MDA4LCJleHAiOjE3NzEwNTQwMDh9.vdQkHlDT2C3zgWxCPsIGehEzigXNdOkKF6IiDqSz7Pc'

describe('http request', () => {
  beforeEach(() => {
    localStorage.clear()
    //Mỗi lần vào it thì sẽ clear lôcalStorage nhưng khổ nổi trong Http
    /**
     * thì mình đã khởi tạo cho cache access_token vào class nên dù clear localstorage thì trogn class
     * vẫn có thể còn access_token. CHo nên giải pháp là clear luôn cache => TẠO RA CLASS mới mỗi it
     *
     */
  })
  it('Goi api ko can access_token', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  }),
    it('Goi api can access_token', async () => {
      await http.post('/login', {
        email: 'manhvanlam0699@gmail.com',
        password: '123123123'
      })
      const res = await http.get('me')
      expect(res.status).toBe(HttpStatusCode.Ok)
    }),
    it('test refresh token', async () => {
      localStorage.clear()
      setAccessTokenToLocalStorage(access_token_1s)
      setRefreshTokenToLocalStorage(refresh_token)
      const httpNew = new Http().instance
      const res = await httpNew.get('me')
      expect(res.status).toBe(HttpStatusCode.Ok)
    })
})
