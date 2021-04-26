var couch = require('./couchdb');
var fs = require('fs');
var path = require('path');

var test1 = couch.use('test');

// load data into couchdb
var rawdata = fs.readFileSync(path.resolve('./test.json'));
var testAurin = JSON.parse(rawdata);
testAurin.features.forEach(element => {
  test1.insert(element, element.id,function(err, body) {
    if (err)
      throw err;
  });
});
console.log(testAurin.features.length + 'entries have been inserted');