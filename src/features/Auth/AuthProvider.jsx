import { createContext, useState } from 'react'

export const AuthContext = createContext()

const initialState = {
  token: null,
  expiresAt: null,
  userInfo: {},
}

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')
  const expiresAt = localStorage.getItem('expiresAt')
  const [authState, setAuthState] = useState({
    token,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    expiresAt,
  })

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('expiresAt', expiresAt)
    setAuthState({ token, userInfo, expiresAt })
  }

  const logout = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('userInfo', JSON.stringify({}))
    localStorage.setItem('expiresAt', '')
    setAuthState(initialState)
  }

  const isAuthenticated = () => {
    if (authState.token && authState.expiresAt) {
      return new Date().getTime() / 1000 < authState.expiresAt
    } else {
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}