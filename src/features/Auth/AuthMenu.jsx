import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { privateRoutes, routes } from '../../App'
import { useAuth } from './useAuth.hook'

export const AuthMenu = () => {
  const { logout, isAuthenticated, authState } = useAuth()
  const { role } = authState.userInfo
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const close = () => setAnchorEl(null)
  return (
    <>
      {isAuthenticated() ? (
        <>
          <IconButton onClick={(e) => setAnchorEl(e.target)}>
            <Avatar />
          </IconButton>
          <Menu open={open} onClose={close} anchorEl={anchorEl}>
            {Object.values(privateRoutes)
              .filter((route) => route.allowedRoles.includes(role))
              .map((route) => (
                <MenuItem
                  key={route.name}
                  to={route.path}
                  component={LinkRouter}
                  onClick={close}
                >
                  {route.name}
                </MenuItem>
              ))}
            <MenuItem onClick={async () => await logout()}>Выйти</MenuItem>
          </Menu>
        </>
      ) : (
        <Button to={routes.login.path} component={LinkRouter}>
          {routes.login.name}
        </Button>
      )}
    </>
  )
}
