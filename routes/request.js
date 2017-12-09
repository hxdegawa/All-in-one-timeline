'use strict';

const express = require('express');
const router  = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db      = new sqlite3.Database('db.sqlite3');
require('dotenv').config();

router.get('/', function(req, res) {

});

module.exports = router;
