const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes.js/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use((req, res, next) => {
  req.user = {
    _id: '637b5e16bf7ab33ead099014',
  };

  next();
});
app.use(bodyParser.json());
app.use(router);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
