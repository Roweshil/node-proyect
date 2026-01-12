import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<H1>Hello, World!</H1>')
})

app.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' })
})

app.post('/register', (req, res) => {
  const { username, password } = req.body // cuerpo de la peticion
  console.log(req.body)

  try {
    const id = UserRepository.create(username, password)
    res.json({ id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post('/logout', (req, res) => {
  res.send('Logout endpoint')
})

app.post('/protected', (req, res) => {
  res.send('Protected endpoint')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})