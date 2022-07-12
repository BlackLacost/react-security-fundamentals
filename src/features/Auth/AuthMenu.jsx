import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { routes } from '../../App'
import { useAuth } from './useAuth.hook'

export const AuthMenu = () => {
  const { authState, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const close = () => setAnchorEl(null)
  return (
    <>
      {authState.token ? (
        <>
          <IconButton onClick={(e) => setAnchorEl(e.target)}>
            <Avatar />
          </IconButton>
          <Menu open={open} onClose={close} anchorEl={anchorEl}>
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
