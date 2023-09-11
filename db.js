const mongoose = require("mongoose");

function connectDb(connectStn) {
  return mongoose.connect(connectStn);
}

module.exports = connectDb;
