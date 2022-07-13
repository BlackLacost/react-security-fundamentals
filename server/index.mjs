import { Role } from '@prisma/client'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { json } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from './db.mjs'

const port = 4000
const app = express()

app.use(json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Hello there!' })
})

const createToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1h',
    }
  )
}

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(403).json({ message: 'Wrong email or password' })
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (passwordValid) {
      const token = createToken(user)
      const decodedToken = jwt.decode(token)
      const expiresAt = decodedToken.exp

      const userInfo = {
        id: user.id,
        email: user.email,
        role: user.role,
      }

      res.cookie('token', token, {
        httpOnly: true,
      })

      return res.json({
        message: 'Authentication successful!',
        token,
        userInfo,
        expiresAt,
      })
    } else {
      return res.status(403).json({ message: 'Wrong email or password' })
    }
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: 'Wrong email or password' })
  }
})

app.post('/api/registration', async (req, res) => {
  try {
    const { email, password } = req.body

    const userData = {
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 12),
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email: userData.email },
    })
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const savedUser = await prisma.user.create({ data: userData })

    if (savedUser) {
      const token = createToken(savedUser)
      const decodedToken = jwt.decode(token)
      const expiresAt = decodedToken.exp

      const userInfo = {
        email: savedUser.email,
        role: savedUser.role,
      }

      res.cookie('token', token, {
        httpOnly: true,
      })

      return res.json({ message: 'User created!', token, userInfo, expiresAt })
    } else {
      return res
        .status(400)
        .json({ message: 'There was a problem creating you account' })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .json({ message: 'There was a problem creating you account' })
  }
})

const requireAuth = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'No authorization token was found' })
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!decodedToken) {
    return res
      .status(401)
      .json({ message: 'There was a problem authorizing the request' })
  } else {
    req.user = decodedToken
    next()
  }
}

const requireAdmin = (req, res, next) => {
  const user = req.user

  if (user.role !== Role.ADMIN) {
    return res.status(401).json({ message: 'Insufficent role' })
  }
  next()
}

app.get('/api/users', requireAuth, requireAdmin, async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true },
  })
  return res.json(users)
})

app.patch('/api/user-role', requireAuth, async (req, res) => {
  try {
    const { role } = req.body
    const user = req.user
    await prisma.user.update({ where: { id: user.sub }, data: { role } })
    res.json({
      message:
        'User role updated. You must log in again for the changes to take effect.',
    })
  } catch (err) {
    return res.status(400).json({ error: err })
  }
})

app.get('/api/me', requireAuth, async (req, res) => {
  const { sub } = req.user
  const user = await prisma.user.findUnique({ where: { id: sub } })
  const token = createToken(user)
  const decodedToken = jwt.decode(token)
  const expiresAt = decodedToken.exp

  const userInfo = {
    email: user.email,
    role: user.role,
  }

  res.cookie('token', token, {
    httpOnly: true,
  })

  return res.json({ message: 'You', token, userInfo, expiresAt })
})

app.get('/api/logout', requireAuth, (req, res) => {
  res.clearCookie('token')
  return res.json({ message: 'logout' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server on http://localhost:${port}`)
})
