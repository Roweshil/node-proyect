const http = require('node:http')
const { findAvailablePort } = require('./10-freeport.js')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Nueva solicitud recibida')
  res.end('Hola desde el servidor HTTP')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`)
  })
})
