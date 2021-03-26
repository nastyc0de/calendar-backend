const express = require('express');
require('dotenv').config();

// crear el servidor de express
const app = express();

// directorio publico
app.use(express.static('public'));
// lectura y parseo del body
app.use(express.json());

// rutas 
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT,() =>{
    console.log(`Servidor corriendo el el puerto ${process.env.PORT}`)
})