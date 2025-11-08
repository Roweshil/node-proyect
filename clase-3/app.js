const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')

const app = express()

app.use(express.json())

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' })
})

// Todos los recursos que sean movies se identifican con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  const filteredMovies = movies.filter(
    movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
  )
  res.json(filteredMovies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const {
    title,
    genre,
    year,
    director,
    duration,
    rate,
    poster
  } = req.body

  const newMovie = {
    id: crypto.randomUUID(),
    title,
    genre,
    year,
    director,
    duration,
    rate: rate ?? 0,
    poster
  }

  movies.push(newMovie)

  res.status(201).json(newMovie) // Actualiza el cache del cliente
})

const PORT = process.env.PORT ?? 5555

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
