var express = require("express");
var router = express.Router();
var nano = require("nano");
let user = "admin";
let pass = "admin";
var masterDB = nano(`http://${user}:${pass}@45.113.233.7:5984`);
var tweetDB = masterDB.db.use("tweet");
var userDB = masterDB.db.use("tweet_user");
var design_name = "demo";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

function getView(db, design_name, view_name, params, callback) {
  db.view(design_name, view_name, params, function (err, body) {
    if (!err) {
      callback(body);
    } else {
      callback("Bad Query");
    }
  });
}

// [state, city, suburb, year, month]
router.get("/tweet_count/info", (req, res) => {
  const query_info = req.query;
  const scenario = query_info.scenario;
  switch (scenario) {
    case "1":
      // get view by state and year
      const result = getView(
        tweetDB,
        design_name,
        "SYM_count",
        {
          stale: "ok",
          reduce: true,
          group: true,
          group_level: "2",
        },
        (data) => {
          console.log(data);
          res.json(data);
        }
      );

      break;
    case "2":
      break;
  }
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
