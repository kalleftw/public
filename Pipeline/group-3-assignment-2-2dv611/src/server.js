const history = './api/models/historyModel';
const mongoose = require('mongoose');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongodb_url = process.env.MONGO_URL || 'mongodb://mongo/calc';
  // mongodb_url = process.env.MONGO_URL || 'mongodb://localhost:27017/calc';

mongoose
  .connect(mongodb_url, {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(express.static('public'));

var routes = require('./api/routes');
routes(app);

if (!module.parent) {
  app.listen(port);
}

module.exports = app;

console.log('Server running on port ' + port);
