import { Button, Paper, Stack, Typography } from '@mui/material'
import { useReducer } from 'react'
import { useAuth } from '../features/Auth/useAuth.hook'

export const Dashboard = () => {
  const [showDebugger, toggleDebugger] = useReducer((v) => !v, false)
  const authContext = useAuth()
  return (
    <>
      <Stack mt={2} spacing={2}>
        <Button onClick={toggleDebugger} sx={{ alignSelf: 'start' }}>
          Auth Debugger
        </Button>
        {showDebugger && (
          <Paper>
            <Stack p={3} spacing={2}>
              <Typography variant="h5">Token</Typography>
              <Typography
                p={1}
                bgcolor="lightgray"
                borderRadius="5px"
                sx={{
                  wordBreak: 'break-all',
                }}
              >
                {authContext.authState.token}
              </Typography>
              <Typography variant="h5">Expiry</Typography>
              <Typography p={1} bgcolor="lightgray" borderRadius="5px">
                {authContext.authState.expiresAt}
              </Typography>
              <Typography variant="h5">UserInfo</Typography>
              <Typography
                p={1}
                bgcolor="lightgray"
                borderRadius="5px"
                component="pre"
              >
                {JSON.stringify(authContext.authState.userInfo, null, 2)}
              </Typography>
            </Stack>
          </Paper>
        )}
      </Stack>
    </>
  )
}
