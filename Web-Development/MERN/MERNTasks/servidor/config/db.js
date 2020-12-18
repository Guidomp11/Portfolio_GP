require('dotenv').config({path: 'variables.env'})
const mongoose = require('mongoose');

const conectarDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://guidomern:hcaH26Rg6wB6hz4@cluster0.ektut.mongodb.net/merntasks', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB conectada');
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;