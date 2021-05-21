var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/first", (req, res) => {
  console.log("first");
  res.json({ first: 1 });
});

module.exports = router;
