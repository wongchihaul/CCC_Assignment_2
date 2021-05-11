var couch = require('./couchdb');
var fs = require('fs');
var path = require('path');

var aurin = couch.use('aurin');

// load data into couchdb
var rawdata = fs.readFileSync(path.resolve('../../aurin/test.json'));
var testAurin = JSON.parse(rawdata);
testAurin.features.forEach(element => {
  aurin.insert(element, element.id,function(err, body) {
    if (err)
      throw err;
  });
});
console.log(testAurin.features.length + 'entries have been inserted');