var program = require('commander');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

program
  .option('-s, --server <connection>', 'mongoDB connection string (ex: mongodb://nassimodo:27017)')
  .option('-c, --collection <collection>', 'mongoDB collection')
  .option('--ssl', 'Use ssl')
  .parse(process.argv);


var categories = require('./data/categories.json');
var config = require('./data/config.json');
var products = require('./data/products.json');

function setId(obj) {
  obj._id = new ObjectID(obj.id);
  delete obj.id;
}

// ATTN: Make sure '=' are replaced with '%3D' in the password
const mongoConnectionString = program.server + (program.ssl ? '/?ssl=true&replicaSet=globaldb' : '');
MongoClient.connect(mongoConnectionString, function(err, client) {
  if (err) {
    console.log('Could not connect to server');
    console.log(err);
    return;
  }
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

    if (cat.name.nl === 'Schoenen') {
      cat.specs[0].type = 'SHOES-EUR';
      cat.specs[0].name.fr = 'Taille Euro';
    }

    if (cat.specs) {
      cat.specs.forEach(spec => {
        spec.specOptions.forEach(specOption => {
          delete specOption.title;
        });
      });
    }

    checkMainCategory(cat);

    db.collection('categories').insert(cat);
  });
  console.log('Wrote categories');

  // PRODUCTS
  products.forEach(prod => {
    setId(prod);

    const views = {
      productId: prod._id,
      views: prod.views
    };
    db.collection('product-views').insert(views);

    delete prod.views;

    db.collection('products').insert(prod);
  });
  console.log('Wrote products');


  // CONFIG
  db.collection('config').insert(config);

  console.log('Finishing up');
  client.close();
});


function checkMainCategory(cat) {
  switch (cat.oldMySqlId) {
  case 20:
    cat.mainCategory = 'ACCESORIES';
    cat.mainCategoryImg = 'accesories.jpg';
    break;
  case 129:
    cat.mainCategory = 'AIRSOFT';
    cat.mainCategoryImg = 'airsoft.jpg';
    break;
  case 25:
    cat.mainCategory = 'CAMPING';
    cat.mainCategoryImg = 'camping.jpg';
    break;
  case 53:
    cat.mainCategory = 'TOOLS';
    cat.mainCategoryImg = 'gereedschapen.jpg';
    break;
  case 16:
    cat.mainCategory = 'CLOTHING';
    cat.mainCategoryImg = 'kledij.jpg';
    break;
  case 184:
    cat.mainCategory = 'EQUIPMENT';
    cat.mainCategoryImg = 'equipment.jpg';
    break;
  }

  delete cat.oldMySqlId;
}
