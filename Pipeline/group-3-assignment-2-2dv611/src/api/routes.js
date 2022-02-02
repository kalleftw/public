module.exports = function (app) {
  var arithmetic = require('./controllers/arithmeticController');
  var history = require('./controllers/historyController');

  app.route('/arithmetic').get(arithmetic.calculate);
  app.route('/history').get(history.load);
};
