'use strict';

const express = require('express');
const router  = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db      = new sqlite3.Database('db.sqlite3');
const Twitter = require('twitter');
require('dotenv').config();

router.get('/', function(req, res) {

  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });

  /**
   * Stream statuses filtered by keyword
   * number of tweets per second depends on topic popularity
   **/
  //db.run("DELETE FROM post_box");
  const params = {count: 100};
  client.get('statuses/home_timeline', params, function(error, tweets, response) {
    const getTwitter = () => {
      if (!error) {
        let initialTweetBox = [];
        for (var i=0; i < params.count - 30; i++) {
          var mediaCount = 0;
          var medias = '';
          var tweet = tweets[i];
          if (tweet.extended_entities) {
            mediaCount = tweet.extended_entities.media.length;
            medias = '';
            for (var l = 0;l < mediaCount; l++) {
              medias = medias + tweet.extended_entities.media[l].media_url + ',';
            }
          } else {
            medias = '';
          }
          db.serialize(function() {

            // テーブルがなければ作成
            var stmt = db.prepare("INSERT INTO post_box(service, user, icon_type, icon_url, message, img_url, post_url, value_favorited, is_favorited, value_retweeted, is_retweeted, vlaue_replied, time) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            // プリペアードステートメントでデータ挿入

            stmt.run(["twitter", tweet.user.name, "url", tweet.user.profile_image_url_https, tweet.text, medias.slice(0,-1), `https://twitter.com/user/status/${tweet.id}`, tweet.favorite_count, tweet.favorited, tweet.retweet_count, tweet.retweeted, tweet.reply_count, tweet.created_at]);
            stmt.finalize();
          });
          initialTweetBox.push({
            service: 'Twitter',
            user: tweet.user.name,
            icon_type: 'url',
            icon_url: tweet.user.profile_image_url_https,
            message: tweet.text,
            img_url: medias.slice(0,-1),
            post_url: `https://twitter.com/user/status/${tweet.id}`,
            value_favorited: tweet.favorite_count,
            is_favorited: tweet.favorited,
            value_retweeted: tweet.retweet_count,
            is_retweeted: tweet.retweeted,
            vlaue_replied: tweet.reply_count,
            time: tweet.created_at
          });
        }
        return(initialTweetBox);
      }
    }
    getTwitter();
  });

  client.stream('user',function (stream) {
    var mediaCount = 0;
    var medias = ''
    const streamTweetBox = [];

    stream.on('data',function (tweet) {
      const getStreamTwitter = () => {
        if (tweet.extended_entities) {
          mediaCount = tweet.extended_entities.media.length;
          medias = '';
          for (var i = 0;i < mediaCount; i++) {
            medias = medias + tweet.extended_entities.media[i].media_url + ',';
          }
        } else {
          medias = '';
        }
        //console.log('' + tweet.id + tweet.user.name + tweet.user.profile_image_url_https + tweet.text + '       ' +  tweet.retweet_count + tweet.favorite_count + tweet.reply_count + '             ' +  medias.slice(0,-1));
        db.serialize(function() {

          // テーブルがなければ作成

          // プリペアードステートメントでデータ挿入
          var stmt = db.prepare("INSERT INTO post_box(service, user, icon_type, icon_url, message, img_url, post_url, value_favorited, is_favorited, value_retweeted, is_retweeted, vlaue_replied, time) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
          stmt.run(["twitter", tweet.user.name, "url", tweet.user.profile_image_url_https, tweet.text, medias.slice(0,-1), `https://twitter.com/user/status/${tweet.id}`, tweet.favorite_count, tweet.favorited, tweet.retweet_count, tweet.retweeted, tweet.reply_count, tweet.created_at]);
          stmt.finalize();

          streamTweetBox.push({
            service: 'Twitter',
            user: tweet.user.name,
            icon_type: 'url',
            icon_url: tweet.user.profile_image_url_https,
            message: tweet.text,
            img_url: medias.slice(0,-1),
            post_url: `https://twitter.com/user/status/${tweet.id}`,
            value_favorited: tweet.favorite_count,
            is_favorited: tweet.favorited,
            value_retweeted: tweet.retweet_count,
            is_retweeted: tweet.retweeted,
            vlaue_replied: tweet.reply_count,
            time: tweet.created_at
          });
        });
        return streamTweetBox;
      }
      getStreamTwitter();
    });


    stream.on('error',function (e) {
      console.log(e)
    });
  });

});

module.exports = router;
