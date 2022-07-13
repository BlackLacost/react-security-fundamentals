import axios from 'axios'

const { createContext } = require('react')

export const FetchContext = createContext()

export const FetchProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  })

  return (
    <FetchContext.Provider value={{ authAxios }}>
      {children}
    </FetchContext.Provider>
  )
}
