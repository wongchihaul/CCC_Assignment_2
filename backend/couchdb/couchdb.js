var nano = require('nano');
// The username and password will be passed by the username:password 
// If no admin client is specified, no username and password is required
// Hence the string behind the '||' will be 'http://127.0.0.1:5984'
// The current username and password of couchdb has been set to admin:admin
module.exports = nano(process.env.COUCHDB_URL || 'http://admin:admin@45.113.233.7:5984');