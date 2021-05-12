// var couch = require('./couchdb');
// var aurin = couch.use('aurin');

// module.exports = propertiesViewer;
// async function propertiesViewer() {
//   var body = await aurin.view('viewTest', 'statTest')
//   body.rows.forEach((doc) => {
//     console.log('doc key', doc.key)
//     console.log('doc value', doc.value);
//   })
//   return body;
// }

const fetch = require('node-fetch');
module.exports = propertiesViewer;

async function propertiesViewer() {
  try {

    const data = await fetch('http://admin:admin@localhost:5984/aurin/_design/viewTest/_view/statTest?group=true').then(r => r.json())
    console.log(data.name);
    return data;
  } catch (error) {
    console.log(error.response.body);
  }
};