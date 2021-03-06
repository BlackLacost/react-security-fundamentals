import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
// import { lazy, Suspense } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthProvider } from './features/Auth/AuthProvider'
import { FetchProvider } from './features/Auth/FetchProvider'
import { RequireAdmin } from './features/Auth/RequireAdmin'
import { RequireAuth } from './features/Auth/RequireAuth'
import { AccountPage } from './pages/AccountPage'
import { AuthPage } from './pages/AuthPage'
import { Dashboard } from './pages/Dashboard'
import { HomePage } from './pages/HomePage'
import { UsersPage } from './pages/UsersPage'

// const AccountPage = lazy(() => import('./pages/AccountPage'))
// const Dashboard = lazy(() => import('./pages/Dashboard'))
// const UsersPage = lazy(() => import('./pages/UsersPage'))

export const routes = {
  home: { path: '/', name: 'Главная' },
  registration: { path: '/registration', name: 'Зарегистрироваться' },
  login: { path: '/login', name: 'Войти' },
}

export const privateRoutes = {
  dashboard: { path: '/dashboard', name: 'Dashboard', allowedRoles: ['ADMIN'] },
  users: { path: '/users', name: 'Пользователи', allowedRoles: ['ADMIN'] },
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
    // <Suspense fallback={<>...</>}>
    <AuthProvider>
      <FetchProvider>
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
                      <RequireAdmin>
                        <Dashboard />
                      </RequireAdmin>
                    </RequireAuth>
                  }
                />
                <Route
                  path={privateRoutes.users.path}
                  element={
                    <RequireAuth>
                      <RequireAdmin>
                        <UsersPage />
                      </RequireAdmin>
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
      </FetchProvider>
    </AuthProvider>
    // </Suspense>
  )
}

export default App
