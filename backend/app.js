// MongoDB Connection: mongodb+srv://dimadeloseros1:<password>@cluster0.huawn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb+srv://dimadeloseros1:fgmkiller12@cluster0.huawn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {console.log('Successfully connected to MongoDb Atlas!')})
    .catch((error) => {console.log('Unable to connect to MongoDb Atlas!'); console.error(error);});
    
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.search(bodyParser.json());

app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Thing saved successfully!'
    });
})

app.get('/api/sauces', (req, res, next) => {
    const stuff = [
       {
        _id: 'Something',
        title: 'Something',
        description: 'All of the info about my frist thing',
        imageUrl: '',
        price: 4900,
        userId: 'something',
    },
    {
        _id: 'Something',
        title: 'Something1',
        description: 'All of the info about my frist thing',
        imageUrl: '',
        price: 4900,
        userId: 'something',
    },
   ];
   res.status(200).json(stuff);
});

module.exports = app;