require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


const path = require('path');
const methodOverride =  require('method-override'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const createLocals = require('./middlewares/createLocals');
const hasCookie = require('./middlewares/hasCookie');
const isAdmin = require('./middlewares/isAdmin');

app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({secret:process.env.SESSION}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(hasCookie);
app.use(createLocals);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//ROUTERS
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const populationRouter = require('./routes/populationRouter');
const endpointRouter = require('./routes/endpointRouter');

app.use('/', cors(), mainRouter);
app.use('/user', cors(), userRouter);
app.use('/population', cors(), isAdmin, populationRouter);
app.use('/endpoints', cors(), endpointRouter);


app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));