const http = require('node:http')
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.end('Bienvenido a la página principal')
  } else if (req.url === '/about') {
    res.end('Acerca de nosotros')
  } else if (req.url === '/imagen') {
    fs.readFile('./mao.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500 - Error interno del servidor')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contact') {
    res.end('Contáctanos')
  } else {
    res.statusCode = 404
    res.end('Página no encontrada')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${desiredPort}`)
})
