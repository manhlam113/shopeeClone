import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { config } from './src/constants/config'
import HttpStatusCode from './src/constants/httpCode'
const loginResponse = [
  {
    message: 'Đăng nhập thành công',
    data: {
      access_token:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWEyZDE4MWZhN2Q2MDMzOGJmYjIyMiIsImVtYWlsIjoibWFuaHZhbmxhbTA2OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0yMlQwNzoxMjoyMC4zNDhaIiwiaWF0IjoxNjg0NzM5NTQwLCJleHAiOjE2OTQ3Mzk1Mzl9.WrdHn0eL7YCgQVVWWwjINp4bBYWII8a1gg6g76MoqOE',
      expires: 9999999,
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWEyZDE4MWZhN2Q2MDMzOGJmYjIyMiIsImVtYWlsIjoibWFuaHZhbmxhbTA2OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0yMlQwNzoxMjoyMC4zNDhaIiwiaWF0IjoxNjg0NzM5NTQwLCJleHAiOjE3NzExMzk1NDB9.zy8_ti0xOd02md2c1qMauWL4n8W8D-DHKbRPcLCyIek',
      expires_refresh_token: 86400000,
      user: {
        _id: '645a2d181fa7d60338bfb222',
        roles: ['User'],
        email: 'manhvanlam0699@gmail.com',
        createdAt: '2023-05-09T11:23:04.244Z',
        updatedAt: '2023-05-19T10:48:12.577Z',
        __v: 0,
        address: 'Việt Nam',
        avatar: '762a7c40-4549-4ff4-8efc-6893d30f000d.png',
        date_of_birth: '1999-06-14T17:00:00.000Z',
        name: 'Lâm Văn Mạnh SS',
        phone: '0375461022'
      }
    }
  }
  // ...
]

export const restHandlers = [
  rest.post(`${config.baseURL}login`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginResponse))
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
