var couch = require('../couchdb');
var aurin = couch.use('aurin');

views = {
  "_id": "_design/viewTest",
  // _rev is only required we the views need to be updated,
  // hence it is not necessary when deploying the app
  // "_rev": "13-f274c7e53bf76833e2597d66f16ea668",
  "views": {
    "counter": {
      "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc._id, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
      "reduce": "_count"
    },
    "sum": {
      "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc._id, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
      "reduce" : "_sum"
    },
    "stat": {
      "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc._id, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
      "reduce": "_stats"
    }, 
    "statByMonth": {
      "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc.properties.datemonth, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
      "reduce": "_stats" 
    }
  },
  "language": "javascript"
}

aurin.insert(views);