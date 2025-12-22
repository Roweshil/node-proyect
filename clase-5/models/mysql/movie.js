import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'koshkainvasion_34',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowetCaseGenre = genre.toLowerCase()

      // get genre id from database
      const [genres] = await connection.execute(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowetCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id: genreId }] = genres

      // get movies ids using join
      const [movies] = await connection.query(
        `
        SELECT DISTINCT
        BIN_TO_UUID(m.id) AS id,
        m.title,
        m.year,
        m.duration,
        m.director,
        m.poster,
        m.rate
        FROM movies m
        JOIN movie_genres mg ON mg.movie_id = m.id
        WHERE mg.genre_id = ?;
        `,
        [genreId]
      )

      return movies
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) AS id FROM movies;'
    )

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) AS id FROM movies WHERE id = UUID_TO_BIN(?);', [id]
    )

    if (movies.length === 0) {
      return null
    }

    return movies[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput,// genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')

    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // puede enviar informacion sensible al cliente
      console.error(e)
      throw new Error(e)
      // enviar la traza a un servicio intern
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
      FROM movies WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    const [result] = await connection.execute(
      'DELETE FROM movies WHERE id = UUID_TO_BIN(?)',
      [id]
    )

    return result.affectedRows > 0
  }

  static async update ({ id, input }) {

  }
}
