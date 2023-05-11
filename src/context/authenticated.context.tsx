import React, { createContext, useState } from 'react'
import { getAccessTokenToLocalStorage, getProfileToLocalStorage } from '../utils/utils.auth'
import { User } from '../types/user.type'
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}
const initialAuthenticated: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfileToLocalStorage(),
  setProfile: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAuthenticated)

/**
 * Đây là component Authenticated component nó sẽ return về AppContextProvider
 *  chứa các value là các isAuthenticated và profile và các hàm để thay đổi nó thoe điều kiện
 *
 */
export const AuthenticatedProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthenticated.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAuthenticated.profile)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
