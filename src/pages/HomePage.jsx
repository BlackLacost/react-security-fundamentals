import { Stack, Typography } from '@mui/material'
import { AuthDebugger } from '../components/AuthDebugger'

export const HomePage = () => {
  return (
    <>
      <Stack mt={2} spacing={2}>
        <Typography variant="h3" component="h1">
          HomePage
        </Typography>
        <AuthDebugger />
      </Stack>
    </>
  )
}
