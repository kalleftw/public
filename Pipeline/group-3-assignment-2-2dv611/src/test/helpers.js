var supertest = require('supertest');
var chai = require('chai');
var app = require('../server');
const mongoose = require('mongoose');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);
