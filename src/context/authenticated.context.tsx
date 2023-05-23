import React, { createContext, useState } from 'react'
import { getAccessTokenToLocalStorage, getProfileToLocalStorage } from '../utils/utils.auth'
import { User } from '../types/user.type'
import { ExtendsPurchases } from '../types/purchases.type'
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendPurchases: ExtendsPurchases[]
  setExtendPurchases: React.Dispatch<React.SetStateAction<ExtendsPurchases[]>>
  reset: () => void
}
const initialAuthenticated: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfileToLocalStorage(),
  setProfile: () => null,
  extendPurchases: [],
  setExtendPurchases: () => null,
  reset: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAuthenticated)

/**
 * Đây là component Authenticated component nó sẽ return về AppContextProvider
 *  chứa các value là các isAuthenticated và profile và các hàm để thay đổi nó thoe điều kiện
 *
 */
export const AuthenticatedProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthenticated.isAuthenticated)
  const [extendPurchases, setExtendPurchases] = useState<ExtendsPurchases[]>(initialAuthenticated.extendPurchases)
  const [profile, setProfile] = useState<User | null>(initialAuthenticated.profile)
  const reset = () => {
    setExtendPurchases([]), setProfile(null), setIsAuthenticated(false)
  }
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendPurchases,
        setExtendPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
