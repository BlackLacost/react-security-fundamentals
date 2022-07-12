import { AppBar, Container, Link, Stack, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { routes } from '../App'
import { AuthMenu } from '../features/Auth/AuthMenu'

export const Layout = () => {
  return (
    <>
      <Stack direction="column" minHeight="100vh" bgcolor="lightgray">
        <AppBar color="default" position="sticky">
          <Container>
            <Toolbar
              disableGutters
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Link to={routes.home.path}>{routes.home.name}</Link>
              <AuthMenu />
            </Toolbar>
          </Container>
        </AppBar>
        <Container>
          <Outlet />
        </Container>
      </Stack>
    </>
  )
}
