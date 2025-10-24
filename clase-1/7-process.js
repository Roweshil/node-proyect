//argumentos de entrada
console.log(process.argv);

process.exit(1); //código de salida

process.on(exit, () => {
    console.log('El proceso terminó'); // limpiar recursos etc
});

process.cwd(); //current working directory

process.env.NODE_ENV // variables de entorno


