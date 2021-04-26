var couch = require('../couchdb');
var test2 = couch.use('test2');

module.exports = minPriceViewer;
// TODO: implementing relavent codes to specify views instead of manually specifying in Fauxton
function minPriceViewer() {
  test2.view('viewMinPrice', 'viewMinPrice', function(err, body) {
    if (!err) {
      body.rows.forEach(function(doc) {
        console.log(doc.value);
      });
      return body;
    }
  });
}
