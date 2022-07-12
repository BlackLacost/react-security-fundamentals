import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { routes } from '../../App'
import { useAuth } from './useAuth.hook'

export const AuthMenu = () => {
  const { logout, isAuthenticated } = useAuth()
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
            <MenuItem to={routes.dashboard.path} component={LinkRouter}>
              {routes.dashboard.name}
            </MenuItem>
            <MenuItem onClick={logout}>Выйти</MenuItem>
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
