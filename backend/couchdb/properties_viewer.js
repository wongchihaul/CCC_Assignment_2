  var couch = require('./couchdb');
var aurin = couch.use('aurin');

module.exports = propertiesViewer;
async function propertiesViewer() {
  var body = await aurin.view('viewTest', 'statTest')
  body.rows.forEach((doc) => {
    console.log('doc key', doc.key)
    console.log('doc value', doc.value);
  })
  return body;
}