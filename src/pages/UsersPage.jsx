import { Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { AuthDebugger } from '../components/AuthDebugger'
import { useAuthAxios } from '../features/Auth/useAuthAxios.hook'

export const UsersPage = () => {
  const { authAxios } = useAuthAxios()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await authAxios.get('users')
      setUsers(res.data)
    }
    fetchUsers()
  }, [authAxios])

  return (
    <>
      <Stack mt={2} spacing={2}>
        <Paper>
          <Stack p={5}>
            <Typography variant="h3" component="h1">
              Пользователи
            </Typography>
            <pre>{JSON.stringify(users, null, 2)}</pre>
          </Stack>
        </Paper>
        <AuthDebugger />
      </Stack>
    </>
  )
}
