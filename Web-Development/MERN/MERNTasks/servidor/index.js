const express = require('express');
const conectarDB = require('./config/db');

const app = express();
const cors = require('cors');
//conexion a DB
conectarDB();

app.use(cors());

//habilito express.json
app.use(express.json({extended: true}));

const PORT = process.env.PORT || 4000;

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const proyectsRouter = require('./routes/proyect');
const tasksRouter = require('./routes/task');

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/proyects', proyectsRouter);
app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto: ' + PORT);
})