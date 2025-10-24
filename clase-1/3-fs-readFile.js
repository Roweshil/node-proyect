const fs = require('node:fs')


console.log('leyendo primer archivo...')
const text = fs.readFile('archivo.txt', 'utf-8', (err, text) => {
        console.error('primer texto', text)

})
console.log('haciendo  cosas')


console.log('leyendo segundo archivo...')
const secondText = fs.readFile('archivo2.txt', 'utf-8', (err, text) => {
        console.error(text)

})
