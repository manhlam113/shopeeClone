import axios, { AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpCode'
import userImage from '../assets/images/user.svg'
import { config } from '../constants/config'
import { ResponseApiFail } from '../types/utils.type'
export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export const isAxiosUnprocessableEntity = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
export const isAxiosUnauthorized = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}
export const isAxiosExpireToken = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return (
    isAxiosUnauthorized<ResponseApiFail<{ message: string; name: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
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
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateURLProductDetail = (name: string, id: string) => {
  const url = removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
  return url
}

export const getNameIdfromURL = (URL: string) => {
  const arr = URL.split('-')
  const nameId = arr[arr.length - 1]
  return nameId
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseURL}images/${avatarName}` : userImage)
