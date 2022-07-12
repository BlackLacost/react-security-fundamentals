import { Navigate } from 'react-router-dom'
import { routes } from '../../App'
import { useAuth } from './useAuth.hook'

export const RequireAdmin = ({ children }) => {
  const { isAdmin } = useAuth()

  if (!isAdmin()) {
    return <Navigate to={routes.home.path} />
  }

  return children
}
