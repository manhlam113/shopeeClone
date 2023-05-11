export const setAccessTokenToLocalStorage = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}
export const getAccessTokenToLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}
export const clearAccessTokenAtLocalStorage = () => {
  return localStorage.removeItem('access_token')
}
