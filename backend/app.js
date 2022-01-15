// MongoDB Connection: mongodb+srv://dimadeloseros1:<password>@cluster0.huawn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
require('dotenv').config();
const app = express();

mongoose.connect(process.env.SECRET_DB,
{ useNewUrlParser: true, useUnifiedTopology: true, }
)
    .then(() => {console.log('Successfully connected to MongoDb Atlas!')})
    .catch((error) => {console.log('Unable to connect to MongoDb Atlas!'); console.error(error);});
    
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;