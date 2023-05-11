export const setAccessTokenToLocalStorage = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}
export const getAccessTokenToLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const setProfileToLocalStorage = (profile: string) => {
  const profileLS = JSON.stringify(profile)
  localStorage.setItem('profile', profileLS)
}
export const getProfileToLocalStorage = () => {
  const result = localStorage.getItem('profile')
  if (result) {
    return JSON.parse(result)
  }
}
