const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); 

// ************ Middlewares ************ //
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE



// ************ Template Engine ************ //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ************ Route System require and use() ************ //
const mainRouter = require('./routes/mainRouter');

app.use('/', mainRouter);

// ************ Route System require and use() ************ //
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));