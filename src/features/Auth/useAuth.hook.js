const { useContext } = require('react')
const { AuthContext } = require('./AuthProvider')

export const useAuth = () => useContext(AuthContext)
