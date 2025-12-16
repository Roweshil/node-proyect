import CORS from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:1234',
  'http://127.0.0.1:5500',
  'https://my-fake-movie-app.com'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => CORS({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true) // permitir requests desde Postman o curl
    }

    return callback(new Error('Origin not allowed'))
  }
})
