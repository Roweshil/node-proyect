import express from 'express'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'
import { set } from 'zod'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()
app.set('view engine', 'ejs')


app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/protected', (req, res) => {
  res.render('protected')
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body // cuerpo de la peticion
  console.log(req.body)
  try {
    const user = await UserRepository.login(username, password)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_JWT_KEY,
      { expiresIn: '1h' }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true, // solo se puede acceder en el servidor
        secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
        sameSite: 'strict',  //la cookie solo se puede acceder en el mismo dominio
        maxAge: 3600000 // validez durante 1 hora
      })
      .send({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body // cuerpo de la peticion
  console.log(req.body)

  try {
    const id = await UserRepository.create(username, password)
    res.json({ id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post('/logout', (req, res) => {
  res.send('Logout endpoint')
})

app.post('/protected', (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    res.render('protected', data)
  } catch(error) {
    res.status(401).send('Invalid token.')
  }
  
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})