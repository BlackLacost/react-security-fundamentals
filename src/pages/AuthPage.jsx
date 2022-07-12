import {
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { routes } from '../App'
import { useAuth } from '../features/Auth/useAuth.hook'
import { publicFetch } from '../utils/fetch'

export const AuthPage = () => {
  const location = useLocation()
  const authContext = useAuth()
  const [isAuth, setIsAuth] = useState()

  const isLoginPage = location.pathname === routes.login.path

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = {
      email: form.email.value,
      password: form.password.value,
    }
    const { data } = await publicFetch.post(
      isLoginPage ? 'login' : 'registration',
      formData
    )
    authContext.setAuthState(data)
    setIsAuth(true)
  }

  return (
    <>
      {isAuth && <Navigate to={routes.home.path} />}
      <Stack
        height="100vh"
        justifyContent="center"
        alignItems="center"
        bgcolor="lightgray"
      >
        <Paper>
          <form onSubmit={onSubmit}>
            <Stack direction="column" spacing={3} p={5}>
              <Typography variant="h4" component="h1" alignSelf="center">
                {isLoginPage ? 'Войти' : 'Регистрация'}
              </Typography>
              <TextField label="Почта" name="email" required />
              <TextField
                type="password"
                name="password"
                label="Пароль"
                required
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
              >
                {isLoginPage ? (
                  <>
                    <Typography>
                      Ещё нет аккаунта?{' '}
                      <Link to={routes.registration.path}>
                        {routes.registration.name}
                      </Link>
                    </Typography>
                    <Button type="submit">{routes.login.name}</Button>
                  </>
                ) : (
                  <>
                    <Typography>
                      Уже есть аккаунт?{' '}
                      <Link to={routes.login.path}>{routes.login.name}</Link>
                    </Typography>
                    <Button type="submit">{routes.registration.name}</Button>
                  </>
                )}
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </>
  )
}
