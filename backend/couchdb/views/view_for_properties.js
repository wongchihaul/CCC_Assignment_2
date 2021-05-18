var couch = require('../couchdb');
var aurin = couch.use('twitter_user');

views = {
  "_id": "_design/viewTwitterUserTest",
  /* _rev is only required when the views need to be updated,
   hence it is not necessary when deploying the app  */
  "_rev": "1-754a362b36ffe8fa2bfb24d817a903e7",
  "views": {
    // "counter": {
    //   "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc._id, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
    //   "reduce": "_count"
    // },
    // "sum": {
    //   "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc._id, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
    //   "reduce" : "_sum"
    // },
    // "stat": {
    //   "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc._id, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
    //   "reduce": "_stats"
    // }, 
    // "statByMonth": {
    //   "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc.properties.datemonth, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
    //   "reduce": "_stats" 
    // },
    // "statTest": {
    //   "map": "function(doc) {\n if (doc.properties.for_rent_home_lease_minimumprice) {\n emit(doc.properties.for_rent_home_lease_detailedposition45price, doc.properties.for_rent_home_lease_minimumprice); \n} \n}",
    //   "reduce": "function(keys, values) { return sum(values); }"
    // },
    "sum_twitter": {
      "map": "function(doc) { emit([doc.location.city, doc.created_at.year, doc.created_at.month], doc.sentiment_score); }",
      "reduce" : "_sum"
    }
  },
  "language": "javascript"
}

aurin.insert(views);