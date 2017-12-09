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
      .goto('https://timeline.line.me')
      .click('a.i1', {waitLoadEvent: true})
      .insert('input#id', lineLoginId)
      .insert('input#passwd', '')
      .click('input[type="submit"]', {waitLoadEvent: true})
      .evaluate(() => {
        var outputArray = [];
        var articles    = document.getElementsByClassName('article');
        var articleLen  = articles.length;
        for (var i = 0; i < articleLen; i++) {
          if(articles[i].getElementsByClassName('type_text')[0] === undefined) continue;
          var imgsArray = [];
          var imgsLen = articles[i].getElementsByClassName('article_contents')[0].getElementsByClassName('media_grid').length;
          for (var j = 0; j < imgsLen; j++) imgsArray[j] = articles[i].getElementsByClassName('article_contents')[0].getElementsByClassName('media_grid')[0].getElementsByTagName('a')[j].getElementsByTagName('span')[0].style.backgroundImage.split('"')[1];
          var imgsArrayCommaJoin = (imgsLen === 0) ? null : imgsArray.join(',');
          var valueFavorited = 0;
          valueFavorited = (articles[i].getElementsByClassName('article_status')[0].getElementsByClassName('amount')[0] === undefined) ? 0 : articles[i].getElementsByClassName('article_status')[0].getElementsByClassName('amount')[0].innerText.trim();
          outputArray.push({
            observer: articles[i].getElementsByClassName('article_information')[0].getElementsByClassName('nickname')[0].innerText,
            icon_type: 'url',
            icon_url: articles[i].getElementsByClassName('article_information')[0].getElementsByClassName('profile')[0].getElementsByTagName('img')[0].src,
            message: articles[i].getElementsByClassName('type_text')[0].innerText,
            img_url: imgsArrayCommaJoin,
            post_url: articles[i].getElementsByClassName('article_information')[0].getElementsByClassName('time')[0].getElementsByTagName('a')[0].href,
            value_favorited: valueFavorited,
            is_favorited: (articles[i].getElementsByClassName('article_status')[0].getElementsByClassName('behavior')[0].getElementsByClassName('behavior_like')[0].getElementsByClassName('check _c_ex')[0] === undefined) ? false : true,
            value_retweeted: null,
            is_retweeted: null,
            vlaue_replied: (articles[i].getElementsByClassName('more_comments')[0] === undefined) ? null : articles[i].getElementsByClassName('more_comments')[0].innerText.replace(/[^0-9^\.]/g, '')
          });
        }
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
