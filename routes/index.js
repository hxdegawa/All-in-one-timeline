'use strict';

const express = require('express');
const router  = express.Router();
const db      = new require('sqlite3').verbose().Database('db.sqlite3');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
