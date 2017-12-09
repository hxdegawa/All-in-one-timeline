'use strict';

const express = require('express');
const router  = express.Router();
const db      = new require('sqlite3').verbose().Database('db.sqlite3');
require('dotenv').config();

router.get('/', function(req, res) {

});

module.exports = router;
