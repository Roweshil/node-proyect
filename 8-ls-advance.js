const fs = require('node:fs/promises');
const path = require('node:path');

const folder = process.argv[2] ?? '.'

async  function ls (folder) {
    let files

    try {
        files = await fs.readdir(folder);
    } catch {
        console.error(`Error al leer el directorio ${folder}`);
        process.exit(1);
    }

    const filePromises = files.map(async (file) => {
        const filePath = path.join(folder, file)
        let stats

        try {
            stats = await fs.stat(filePath) // Obtener información del archivo
        } catch {
            console.error(`Error al obtener información del archivo ${filePath}`);
            process.exit(1);
        }

        const isDirectory = stats.isDirectory() 
        const fileType = isDirectory ? 'd' : '-';
        const fileSize = stats.size;
        const fileModified = stats.mtime.toLocaleString();

        return `${fileType} ${file} ${fileSize.toString()}  ${fileModified}`;
    })

    const fileInfo = await Promise.all(filePromises);
    
    fileInfo.forEach(info => console.log(info));
}


ls(folder)
