import { Router } from 'express'
import { MoviesController } from '../controllers/movies.js'

export const moviesRouter = Router()

// Aquí irán las rutas relacionadas con movies

moviesRouter.get('/', MoviesController.getAll)

moviesRouter.get('/:id', MoviesController.getById)

moviesRouter.post('/', MoviesController.post)

moviesRouter.delete('/:id', MoviesController.delete)

moviesRouter.patch('/:id', MoviesController.patch)
