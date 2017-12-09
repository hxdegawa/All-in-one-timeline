'use strict';

const express = require('express');
const router  = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db      = new sqlite3.Database('db.sqlite3');
const Chromy  = require('chromy');
const chromy  = new Chromy();
require('dotenv').config();

router.get('/', function(req, res) {
  res.send('Hello');
  chromy.chain()
      // 指定のページを表示しロードが完了するのを待つ
      .goto('http://example.com')
      // ブラウザ内でJavaScriptを評価する
      .evaluate(_ => {
        return document.querySelectorAll('*').length
      })
      // 前のアクション(ブラウザ内での関数の評価)の結果を受け取り処理する
      .result(r => console.log(r))
      // アクションの終了
      .end()
      // エラー表示
      .catch(e => console.log(e))
      // ブラウザを閉じる
      .then(_ => chromy.close())
});

module.exports = router;
