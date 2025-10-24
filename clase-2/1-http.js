const http = require('node:http')

const desiredPort = process.env.PORT ?? 1234

const server = http.createServer((req, res) => {
  console.log('Nueva solicitud recibida')
  res.end('Hola desde el servidor HTTP')
})

server.listen(desiredPort, () => {
console.log(`Servidor escuchando en el puerto http://localhost:${port}`)
})
