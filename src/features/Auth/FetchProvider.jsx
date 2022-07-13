import axios from 'axios'
import { useAuth } from './useAuth.hook'

const { createContext } = require('react')

export const FetchContext = createContext()

export const FetchProvider = ({ children }) => {
  const authContext = useAuth()
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${authContext.authState.token}`
      return config
    },
    (error) => Promise.reject(error)
  )

  return (
    <FetchContext.Provider value={{ authAxios }}>
      {children}
    </FetchContext.Provider>
  )
}
