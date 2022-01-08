// MongoDB Connection: mongodb+srv://dimadeloseros1:<password>@cluster0.huawn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');


const app = express();

mongoose.connect('mongodb+srv://dimadeloseros1:fgmkiller12@cluster0.huawn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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

  



app.use('/api/auth', userRoutes);

module.exports = app;