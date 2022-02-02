var mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    result: {
      type: Number,
      required: true,
    },

    operation: {
      type: String,
      required: true,
    },

    operand1: {
      type: Number,
      required: true,
    },

    operand2: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('History', schema);
