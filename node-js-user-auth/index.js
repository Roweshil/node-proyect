import express from 'express'
import { PORT } from './config.js'

const app = express()


app.get('/', (req, res) => {
  res.send('<H1>Hello, World!</H1>')
})

app.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' })
})

app.post('/register', (req, res) => {
  res.send('Register endpoint')
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