import bcrypt from 'bcryptjs'
import cors from 'cors'
import express, { json } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from './db.mjs'

const port = 4000
const app = express()

app.use(json())
app.use(cors())

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
      expiresIn: '10s',
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

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`)
})
