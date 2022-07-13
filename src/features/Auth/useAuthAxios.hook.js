import { FetchContext } from './FetchProvider'

const { useContext } = require('react')

export const useAuthAxios = () => useContext(FetchContext)
