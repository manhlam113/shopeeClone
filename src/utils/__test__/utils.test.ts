import { describe, expect, it } from 'vitest'
import { isAxiosError, isAxiosUnauthorized, isAxiosUnprocessableEntity } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from '../../constants/httpCode'
describe('isAxiosError', () => {
  it('isAxiosError trả về true nếu error là kiểu axios error', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
  it('isAxiosUnprocessableEntity trả về true nếu trả về status là 422', () => {
    expect(
      isAxiosUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
  it('isAxiosUnauthorized trả về true nếu trả về status là 401', () => {
    expect(
      isAxiosUnauthorized(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.Unauthorized,
          data: null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})
