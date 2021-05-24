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
  let result;
  switch (scenario) {
    case "SY":
      // get view by state and year
      result = getView(
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

    case "SCY":
      //get view by city and year
      result = getView(
          tweetDB,
          design_name,
          "SCSYM_count",
          {
            stale: "ok",
            reduce: true,
            group: true,
            group_level: "3",
          },
          (data) => {
            console.log(data);
            res.json(data);
          }
      );
      break;

    case "SCSY":
      //get view by suburb and year
      result = getView(
          tweetDB,
          design_name,
          "SCSYM_count",
          {
            stale: "ok",
            reduce: true,
            group: true,
            group_level: "4",
          },
          (data) => {
            console.log(data);
            res.json(data);
          }
      );
      break;

    case "SCSYM":
      //get view by suburb and month
      result = getView(
          tweetDB,
          design_name,
          "SCSYM_count",
          {
            stale: "ok",
            reduce: true,
            group: true,
            group_level: "5",
          },
          (data) => {
            console.log(data);
            res.json(data);
          }
      );
      break;

    case "YMS":
      //get view by month and state
      result = getView(
          tweetDB,
          design_name,
          "YMSCS_count",
          {
            stale: "ok",
            reduce: true,
            group: true,
            group_level: "3",
          },
          (data) => {
            console.log(data);
            res.json(data);
          }
      );
      break;

    case "YMSC":
      //get view by month and city
      result = getView(
          tweetDB,
          design_name,
          "YMSCS_count",
          {
            stale: "ok",
            reduce: true,
            group: true,
            group_level: "4",
          },
          (data) => {
            console.log(data);
            res.json(data);
          }
      );
      break;

    case "YMSCS":
      //get view by month and suburb
      result = getView(
          tweetDB,
          design_name,
          "YMSCS_count",
          {
            stale: "ok",
            reduce: true,
            group: true,
            group_level: "5",
          },
          (data) => {
            console.log(data);
            res.json(data);
          }
      );
      break;
  }
});


router.get("/sentiment_score/info", (req, res) => {
    const query_info = req.query;
    const scenario = query_info.scenario;
    switch (scenario) {
        case "SY":
            // get view by state and year
            getView(
                tweetDB,
                design_name,
                "SYM_avg",
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

        case "SCY":
            //get view by city and year
            getView(
                tweetDB,
                design_name,
                "SCSYM_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "3",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;

        case "SCSY":
            //get view by suburb and year
            getView(
                tweetDB,
                design_name,
                "SCSYM_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "4",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;

        case "SCSYM":
            //get view by suburb and month
            getView(
                tweetDB,
                design_name,
                "SCSYM_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "5",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;

        case "YMS":
            //get view by month and state
            getView(
                tweetDB,
                design_name,
                "YMSCS_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "3",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;

        case "YMSC":
            //get view by month and city
            getView(
                tweetDB,
                design_name,
                "YMSCS_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "4",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;

        case "YMSCS":
            //get view by month and suburb
            getView(
                tweetDB,
                design_name,
                "YMSCS_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "5",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;
    }
})

// relation between the number of accounts signed up and when they signed up
router.get("/created_count/info", (req, res) => {
    const query_info = req.query;
    const scenario = query_info.scenario;
    switch (scenario) {

        // only location

        case "S":
            // the total tweet count of each state from 2020 to 2021
            getView(
                userDB,
                design_name,
                "SCS_tweet_count",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "1",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;
        case "SC":
            // the total tweet count of each [state, city] from 2020 to 2021
            getView(
                userDB,
                design_name,
                "SCS_tweet_count",
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
        case "SCS":
            // the total tweet count of each [state, city, suburb] from 2020 to 2021
            getView(
                userDB,
                design_name,
                "SCS_tweet_count",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "3",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;

        // location & time
        case "SY":
            // state:{year}
            getView(
                userDB,
                design_name,
                "state_created_YM_count",
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
        case "SYM":
            // state:{[year, month]}
            getView(
                userDB,
                design_name,
                "state_created_YM_count",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "3",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;


        case "SM":
            // state:{month}
            getView(
                userDB,
                design_name,
                "state_created_month_count",
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


        case "SCSM":
            // [state, city, suburb]:{month}
            getView(
                userDB,
                design_name,
                "SCS_created_month_count",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "4",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;


        case "SCSY":
            // [state, city, suburb]:{year}
            getView(
                userDB,
                design_name,
                "SCS_created_YM_count",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "4",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;

        case "SCSYM":
            // [state, city, suburb]:{[year, month]}
            getView(
                userDB,
                design_name,
                "SCS_created_YM_count",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "5",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;
    }
});

// change of user's statuses_count over 2020 and 2021
router.get("/statuses_count/info", (req, res) => {
    const query_info = req.query;
    const scenario = query_info.scenario;
    switch (scenario) {
        case "S_2020":
            //[state]:{2020}
            getView(
                userDB,
                design_name,
                "state_2020_statuses_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "1",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;
        case "S_2021":
            //[state]:{2021}
            getView(
                userDB,
                design_name,
                "state_2021_statuses_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "1",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;
        case "SCS_2020":
            //[state, city, suburb]:{2020}
            getView(
                userDB,
                design_name,
                "SCS_2020_statuses_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "1",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;
        case "SCS_2021":
            //[state, city, suburb]:{2021}
            getView(
                userDB,
                design_name,
                "state_2021_statuses_avg",
                {
                    stale: "ok",
                    reduce: true,
                    group: true,
                    group_level: "1",
                },
                (data) => {
                    console.log(data);
                    res.json(data);
                }
            );
            break;
    }
});

module.exports = router;
