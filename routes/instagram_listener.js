'use strict';

const express = require('express');
const router  = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db      = new sqlite3.Database('db.sqlite3');
const Chromy  = require('chromy');
const chromy  = new Chromy();
require('dotenv').config();

let lineLoginId = '';

router.get('/', function(req, res) {

  chromy.chain()
      .goto('')
      .click('', {waitLoadEvent: true})
      .insert('', lineLoginId)
      .insert('', '')
      .click('', {waitLoadEvent: true})
      .evaluate(() => {
        var outputArray = [];
        return outputArray;
      })
      .result((r) => { if (r[0] !== undefined) {

        console.log(r);
      }})
      .end()
      .catch((e) => {
        console.log(e);
      })
      .then(() => chromy.close())

  res.send('complete');

});

module.exports = router;
