import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { Role } from '@prisma/client'
import { useEffect, useState } from 'react'
import { AuthDebugger } from '../components/AuthDebugger'
import { useAuth } from '../features/Auth/useAuth.hook'
import { useAuthAxios } from '../features/Auth/useAuthAxios.hook'
import { publicFetch } from '../utils/fetch'

export const AccountPage = () => {
  const [message, setMessage] = useState(null)
  const { authState, setAuthState } = useAuth()
  const { authAxios } = useAuthAxios()
  const [role, setRole] = useState(authState.userInfo.role)

  const handleChange = (event) => {
    setRole(event.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    let res = await authAxios.patch('user-role', { role })
    setMessage(res.data.message)
    res = await publicFetch.get('me')
    const { token, userInfo, expiresAt } = res.data
    setAuthState({ token, userInfo, expiresAt })
  }

  useEffect(() => {}, [setAuthState])

  return (
    <Stack mt={2} spacing={2}>
      <Typography variant="h3" component="h1">
        Аккаунт
      </Typography>
      <Paper sx={{ alignSelf: 'start' }}>
        <Stack p={3} spacing={2}>
          <Typography variant="subtitle1">Выбери роль для себя</Typography>
          {message && <Alert severity="success">{message}</Alert>}
          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <InputLabel id="select-role">Role</InputLabel>
                <Select
                  labelId="select-role"
                  id="role"
                  value={role}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={Role.USER}>User</MenuItem>
                  <MenuItem value={Role.ADMIN}>Admin</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit">Изменить роль</Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
      <AuthDebugger />
    </Stack>
  )
}
