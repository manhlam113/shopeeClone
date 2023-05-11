import React, { createContext, useState } from 'react'
import { getAccessTokenToLocalStorage } from '../utils/utils.auth'
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
const initialAuthenticated: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLocalStorage()),
  setIsAuthenticated: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAuthenticated)
export const AuthenticatedProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthenticated.isAuthenticated)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
