import { describe, expect, it } from 'vitest'
import {
  getAccessTokenToLocalStorage,
  getRefreshTokenToLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage,
  setRefreshTokenToLocalStorage
} from '../utils.auth'
import { beforeEach } from 'node:test'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Njc5MjllMWZhN2Q2MDMzOGJmYmY3YiIsImVtYWlsIjoibWFuaDFAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0xOVQxNToxODoxOC42MDFaIiwiaWF0IjoxNjg0NTA5NDk4LCJleHAiOjE2ODUxMTQyOTh9.hnwYHXK9BvWIl8B0dW6r3PlSBwK8Hceqti8n9GFI1DY'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmgxQGdtYWlsLmNvbSIsImlkIjoiNjQ2NzkyOWUxZmE3ZDYwMzM4YmZiZjdiIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0xOVQxNToxNTo0Mi45NzZaIiwiaWF0IjoxNjg0NTA5MzQyLCJleHAiOjE2ODQ1MTI5NDJ9.ExU6yQXqCBUj30Ltlhv5Q-tkr0aze0mF8Zu1qloeBvY'
const profile = {
  _id: '6467929e1fa7d60338bfbf7b',
  roles: ['User'],
  email: 'manh1@gmail.com',
  createdAt: '2023-05-19T15:15:42.969Z',
  updatedAt: '2023-05-19T15:18:38.598Z',
  address: 'Việt Nam',
  date_of_birth: '2000-06-14T17:00:00.000Z',
  name: 'vnamnh123',
  phone: '0391230513123'
}

describe('access_token', () => {
  it('access_token được set và lấy ra từ localstorage', () => {
    setAccessTokenToLocalStorage(access_token)
    expect(getAccessTokenToLocalStorage()).toBe(access_token)
  })
})
describe('refresh_token', () => {
  it('access_token được set và lấy ra từ localstorage', () => {
    setRefreshTokenToLocalStorage(refresh_token)
    expect(getRefreshTokenToLocalStorage()).toBe(refresh_token)
  })
})