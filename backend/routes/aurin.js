var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('api for aurin');
});

router.get("/labour/info", (req, res) => {
  var labour_data = require('../../aurin/labour_market/output.json');
  const query_info = req.query;

  let isSummary = false; 
  isSummary = query_info.summary == "true"

  if (query_info.state) {
    const state = query_info.state;
    res.json(filterForLabour(state, isSummary));
  } else {
    res.json(labour_data);
  }

  function filterForLabour(state, isSummary) {
    if (isSummary) {
      return labour_data[state].summary
    } else {
      return labour_data[state].details
    }
  }
});

router.get("/migration/info", (req, res) => {
  var migration_data = require('../../aurin/migration/output.json');
  const query_info = req.query;
  res.json(migration_data);
});




module.exports = router;