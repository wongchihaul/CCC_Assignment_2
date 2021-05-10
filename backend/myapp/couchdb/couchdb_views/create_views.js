var couch = require('../couchdb');
var test2 = couch.use('test2');

module.exports = minPriceViewer;
// TODO: implementing relavent codes to specify views instead of manually specifying in Fauxton
async function minPriceViewer() {
  console.log('调用了吗')
  var body = await test2.view('viewMinPrice', 'viewMinPrice'/* , function(err, body) {
    console.log('body in await', body);
    if (!err) {
      body.rows.forEach(function(doc) {
        console.log(doc.value);
      });
    }
    return body;
  } */)
  var res;
  body.rows.forEach((doc) => {
    console.log('doc value', doc.value);
    res = doc.value;
  })
  console.log('res', res);
  return res;
}
