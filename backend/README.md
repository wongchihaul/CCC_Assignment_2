# Backend

This is the backend of the application which provides API for the frontend and ultilises http requests to get data from database(couchdb)

## Prerequisite

### Application required: 
Apache CouchDB

### Package required:

express
```bash
npm install express --save
```

nano
```bash
npm install nano
```

node-fetch
```bash
npm install node-fetch
```

## Intialisation

### Make sure you are in the /backend directory

1. Create a couchdb instance 

```bash
cd couchdb
node create_db
```

2. Load Aurin test data 

```bash
node load_test
```

3. Insert view to couchdb

```bash
cd ../views
node view_for_properties
```

4. Run the app 
DEBUG=myapp:* npm start (MacOS)

5. Go to [couchdb page](http://localhost:3000/couchdb) in the browser and see the query result in **terminal**

### Note
The step 3 may trigger error showing 'document update conflict', and this can be solved by providing 
correct rev number view_for_properties.js in when inserting views
