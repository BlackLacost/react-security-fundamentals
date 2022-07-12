import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthProvider } from './features/Auth/AuthProvider'
import { RequireAuth } from './features/Auth/RequireAuth'
import { AccountPage } from './pages/AccountPage'
import { AuthPage } from './pages/AuthPage'
import { Dashboard } from './pages/Dashboard'
import { HomePage } from './pages/HomePage'

export const routes = {
  home: { path: '/', name: 'Главная' },
  registration: { path: '/registration', name: 'Зарегистрироваться' },
  login: { path: '/login', name: 'Войти' },
}

export const privateRoutes = {
  dashboard: { path: '/dashboard', name: 'Dashboard', allowedRoles: ['ADMIN'] },
  account: {
    path: '/account',
    name: 'Аккаунт',
    allowedRoles: ['USER', 'ADMIN'],
  },
}

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        component: Link,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
})

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path={routes.home.path} element={<HomePage />} />
              <Route
                path={privateRoutes.dashboard.path}
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path={privateRoutes.account.path}
                element={
                  <RequireAuth>
                    <AccountPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path={routes.registration.path} element={<AuthPage />} />
            <Route path={routes.login.path} element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
