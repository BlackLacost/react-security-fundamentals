import { Navigate } from 'react-router-dom'
import { routes } from '../../App'
import { useAuth } from './useAuth.hook'

export const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated()) {
    return <Navigate to={routes.login.path} />
  }

  return children
}
