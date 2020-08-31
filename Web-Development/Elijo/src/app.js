const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');


app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({secret:'holis'}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//ROUTERS
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');

app.use('/', mainRouter);
app.use('/user', userRouter);


app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));