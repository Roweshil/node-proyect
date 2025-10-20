const path = require('node:path');

// barra separadora de directorios segun el sistema operativo
console.log(path.sep);

//unir rutas de archivos o carpetas
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log(filePath);

//basename - nombre del archivo
const base = path.basename('\temp\content\subfolder\test.txt');
console.log(base);

//filename - ruta absoluta
const basename = path.basename('\temp\content\subfolder\test.txt', '.txt');
console.log(basename);

//extension del archivo
const ext = path.extname('\temp\content\subfolder\test.txt');
console.log(ext);