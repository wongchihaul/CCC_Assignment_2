var express = require("express");
var router = express.Router();
var nano = require("nano");
let user = "admin";
let pass = "admin";
var masterDB = nano(`http://${user}:${pass}@45.113.233.7:5984`);
var tweetDB = masterDB.db.use("tweet");
var userDB = masterDB.db.use("tweet_user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// [state, city, suburb, year, month]
router.get("/first", (req, res) => {
  console.log("first");
  tweetDB.view(
    "demo",
    "SCSYM_count",
    { stale: "ok", reduce: true, group: true, group_level: "2" },
    function (err, body) {
      if (!err) {
        res.json(body);
        console.log(typeof body);
      } else {
        res.json(err);
        console.log(err);
      }
    }
  );
});
router.get("/tweet_user", (req, res) => {
  userDB.view("demo", "state_tweet_count", function (err, body) {
    if (!err) {
      res.json(body);
    } else {
      res.json(err);
    }
  });
});

module.exports = router;
