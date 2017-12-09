'use strict';

const express   = require('express');
const router    = express.Router();
const requestIp = require('request-ip');
const exec      = require('child_process').exec;
require('dotenv').config();

router.get('/', function(req, res) {
  const clientIp = requestIp.getClientIp(req);
  exec(`curl -X POST -H "Content-Type: application/json" -d '{"value1":"${clientIp}"}' https://maker.ifttt.com/trigger/${process.env.IFTTT_TRIGGER_FOR_SLACK}/with/key/${process.env.IFTTT_TOKEN_FOR_SLACK}`);
  res.send(`<h1>Your IP address 『 ${clientIp} 』</h1>`);

});

module.exports = router;
