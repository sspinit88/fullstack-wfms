const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI)
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch(error => {
      console.log(error);
    });

// подключаем роуты
const authRouts = require('./routes/auth');
const analyticsRouts = require('./routes/analytics');
const categoryRouts = require('./routes/category');
const orderRouts = require('./routes/order');
const positionRouts = require('./routes/position');

/* use() - позволяет добавлять плагины, методы, роуты  */
app.use(bodyParser.urlencoded({extended:true})); // urlencoded - инкодирует url
app.use(bodyParser.json()); // позволит генерироввать js-obj из получаемого json

app.use(morgan('dev'));
app.use(cors('use'));

app.use('/api/auth', authRouts);
app.use('/api/analytics', analyticsRouts);
app.use('/api/category', categoryRouts);
app.use('/api/order', orderRouts);
app.use('/api/position', positionRouts);





module.exports = app;