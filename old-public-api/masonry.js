// Masonry: Add image dimensions to products.json
// (this should be run only once)

var products = require('./products.json');
var fs = require('fs');
//var sizeOf = require('image-size');

// var processed = 0;
// products.forEach(async product => {
//   if (product.imageCount) {
//     product.images = [];
//     for (let imageCount = 1; imageCount <= product.imageCount; imageCount++) {
//       const path = `../images/ProductImages/${product.id}_${imageCount}.png`;
//       if (!fs.existsSync(path)) {
//         console.log('IMAGE DID NOT EXIST', path);
//       } else {
//         const dimensions = await sizeOf(path);
//         product.images.push({
//           count: imageCount,
//           ...dimensions
//         });
//         //console.log('adding ' + JSON.stringify(product.images) + ' for ' + path);
//       }
//     }
//   }
//   delete product.imageCount;
//   processed++;
//   if (processed === products.length) {
//     console.log('writing file');
//     fs.writeFileSync('./products.json', JSON.stringify(products, null, 4));
//   }
// });


// Back to imageCount property
var processed = 0;
products.forEach(product => {
  let exists = true;
  let imageCount = 0;
  do {
    imageCount++;
    const path = `../images/ProductImages/${product.id}_${imageCount}.png`;
    exists = fs.existsSync(path);
  }
  while (exists)

  if (imageCount > 1)
    product.imageCount = imageCount - 1;
});

console.log('writing file');
fs.writeFileSync('./products.json', JSON.stringify(products, null, 4));
