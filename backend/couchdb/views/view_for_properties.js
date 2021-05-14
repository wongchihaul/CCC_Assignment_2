var couch = require('../couchdb');
var aurin = couch.use('test2');

views = {
  "_id": "_design/viewTest",
  // _rev is only required when the views need to be updated,
  // hence it is not necessary when deploying the app
  "_rev": "1-33e73062eca7b09a701bf16d74a9ca06",
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
    },
    "statTest": {
      "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc.properties.for_rent_home_lease_detailedposition45price, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
      "reduce": "function(keys, values) { return sum(values); }"
    },
    "avg": {
      "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc.properties.for_rent_home_lease_detailedposition45price, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
      "reduce": "function(keys, values) { return sum(values); }"
    }
  },
  "language": "javascript"
}

aurin.insert(views);