import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/HomePage'

export const routes = {
  home: { path: '/', name: 'Главная' },
  registration: { path: '/registration', name: 'Зарегистрироваться' },
  login: { path: '/login', name: 'Войти' },
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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path={routes.home.path} element={<HomePage />} />
          </Route>
          <Route path={routes.registration.path} element={<AuthPage />} />
          <Route path={routes.login.path} element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
