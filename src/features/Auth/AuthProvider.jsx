import { Role } from '@prisma/client'
import { createContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from '../../App'

export const AuthContext = createContext()

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
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('expiresAt')
    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {},
    })
    return <Navigate to={routes.login.path} />
  }

  const isAuthenticated = () => {
    if (authState.token && authState.expiresAt) {
      return new Date().getTime() / 1000 < authState.expiresAt
    } else {
      return false
    }
  }

  const isAdmin = () => {
    return authState.userInfo.role === Role.ADMIN
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        isAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
