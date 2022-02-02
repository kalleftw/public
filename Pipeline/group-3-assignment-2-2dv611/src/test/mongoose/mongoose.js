const { assert, expect } = require('chai');
const mongoose = require('mongoose');
const History = require('../../api/models/historyModel.js');

describe('Mongoose', function () {
  before('connect', () => {
    mongoose
      .connect('mongodb://localhost:27017/calc', {
        useNewUrlParser: true,
      })
      .then(() => console.log('MongoDB Connected'))
      .catch((err) => console.log(err));
  });

  it('Creates a new calculation', (done) => {
    const calculation = new History({
      result: 59,
      operand1: 50,
      operand2: 9,
      operation: 'add',
    });

    if (calculation.operand1 + calculation.operand2 === calculation.result) {
      calculation.save().then(() => {
        assert(!calculation.isNew);
        global.id = calculation._id;
        global.result = calculation.result;
        done();
      });
    } else {
      throw new Error(
        `Operand 1 + Operand 2 is not equal ${calculation.result}`
      );
    }
  });

  it('Check that added calculation id is equal to the id of the caluclation inside database', (done) => {
    if (global.id != undefined) {
      History.findOne({ _id: global.id }).then((history) => {
        assert.equal(history.id, global.id);
        done();
      });
    } else {
      throw new Error('ID is undefined, results does most likely not add up.');
    }
  });

  it('Check that the calculation is correct using id', (done) => {
    if (global.id !== undefined) {
      History.findOne({ _id: global.id }).then((history) => {
        assert.equal(history.result, global.result);
        done();
      });
    } else {
      throw new Error('ID is undefined, results does most likely not add up.');
    }
  });

  it('Removes a calculation using its id', (done) => {
    if (global.id !== undefined) {
      History.findByIdAndRemove(global.id)
        .then(() => History.findOne({ _id: global.id }))
        .then((history) => {
          assert(history === null);
          done();
        });
    } else {
      throw new Error('ID is undefined, results does most likely not add up.');
    }
  });
});
