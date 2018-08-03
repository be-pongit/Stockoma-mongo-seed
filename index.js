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

function setId(obj) {
  obj._id = new ObjectID(obj.id);
  delete obj.id;
}

MongoClient.connect(program.server, function(err, client) {
  console.log('Connected successfully to server');

  const db = client.db(program.collection);

  // CATEGORIES
  categories.forEach(cat => {
    setId(cat);
    if (cat.options) {
      cat.options.forEach(setId);
    }
    if (cat.specs) {
      cat.specs.forEach(spec => {
        setId(spec);
        spec.specOptions.forEach(setId);
      });
    }

    db.collection('categories').insert(cat);
  });
  console.log('Wrote categories');

  // PRODUCTS
  products.forEach(prod => {
    setId(prod);
    db.collection('products').insert(prod);
  });
  console.log('Wrote products');


  // CONFIG
  db.collection('config').insert(config);

  console.log('Finishing up');
  client.close();
});
