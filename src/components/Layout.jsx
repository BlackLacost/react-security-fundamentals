import { AppBar, Button, Container, Link, Stack, Toolbar } from '@mui/material'
import { Link as LinkRouter, Outlet } from 'react-router-dom'
import { routes } from '../App'

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
              <Button to={routes.login.path} component={LinkRouter}>
                {routes.login.name}
              </Button>
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
