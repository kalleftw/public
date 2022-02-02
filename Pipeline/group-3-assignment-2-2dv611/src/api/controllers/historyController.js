const history = require('../models/historyModel.js');

exports.load = async function (req, res) {
  req.app.use(function (err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    res.status(400);
    res.json({ error: err.message });
  });

  const allData = await history.find();
  console.log(allData);

  res.json({ result: allData });
};
