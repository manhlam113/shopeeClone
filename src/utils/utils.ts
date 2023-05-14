import axios, { AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpCode'
export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export const isAxiosUnprocessableEntity = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const formatNumberToCurrency = (number: number) => {
  return new Intl.NumberFormat('de-DE').format(number)
}

export const formatNumberToSocialStyle = (number: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(number)
    .replace('.', ',')
    .toLowerCase()
}
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export const rateSale = (original: number, sale: number) => {
  const result = ((original - sale) / original) * 100
  return Math.floor(result) + '%'
}
