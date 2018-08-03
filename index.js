var program = require('commander');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

program
  .option('-s, --server <connection>', 'mongoDB connection string (ex: mongodb://nassimodo:27017)')
  .option('-c, --collection <collection>', 'mongoDB collection')
  .parse(process.argv);


var categories = require('./data/categories.json');
var config = require('./data/config.json');
var products = require('./data/products.json');

MongoClient.connect(program.server, function(err, client) {
  console.log('Connected successfully to server');

  const db = client.db(program.collection);

  categories.forEach(cat => {
    cat._id = new ObjectID(cat.id);
    delete cat.id;
    db.collection('categories').insert(cat);
  });
  console.log('Wrote categories');

  products.forEach(prod => {
    prod._id = new ObjectID(prod.id);
    delete prod.id;
    db.collection('products').insert(prod);
  });
  console.log('Wrote products');

  db.collection('config').insert(config);

  console.log('Done');
  client.close();
});
