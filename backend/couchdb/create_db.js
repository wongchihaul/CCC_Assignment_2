var couch = require('./couchdb');

couch.db.create('aurin', function(err) {  
  if (err) {
    console.error(err);
  }
});