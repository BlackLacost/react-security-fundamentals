import { Role } from '@prisma/client'
import { createContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from '../../App'
import { publicFetch } from '../../utils/fetch'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userInfo: {},
    expiresAt: null,
  })

  useEffect(() => {
    const me = async () => {
      const res = await publicFetch.get('me')
      const { token, userInfo, expiresAt } = res.data
      setAuthState({ token, userInfo, expiresAt })
    }
    me()
  }, [])

  const logout = async () => {
    const res = await publicFetch.get('logout')
    console.log(res)
    // setAuthState({
    //   token: null,
    //   expiresAt: null,
    //   userInfo: {},
    // })
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
        setAuthState,
        isAuthenticated,
        isAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
