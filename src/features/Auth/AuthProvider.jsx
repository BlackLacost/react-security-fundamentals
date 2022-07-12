import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    expiresAt: null,
    userInfo: {},
  })

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    setAuthState({ token, userInfo, expiresAt })
  }

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState: (authInfo) => setAuthInfo(authInfo) }}
    >
      {children}
    </AuthContext.Provider>
  )
}
