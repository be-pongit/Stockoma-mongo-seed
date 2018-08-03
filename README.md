Mongo-Seed
==========

Setup mongo

```
docker run -id -p 27010:27017 --name stockoma-mongo mongo
```

Fill db with

```
npm install
node index.js --server=mongodb://pongit:27010 --collection=stockoma
```
