Mongo-Seed
==========

## Setup mongo

```
docker run -id -p 27010:27017 --name stockoma-mongo mongo
```

## Fill db with

```
npm install
node index.js --server=mongodb://pongit:27010 --collection=stockoma
```

For subsequent db fills, drop the collection first as it will just append data.

## Fill Cosmos db with

Note that the 2 ending '=' need to be replaced with %3D

```
node index.js --ssl --server=mongodb://stockoma-cosmos:secret-primary-key@stockoma-cosmos.documents.azure.com:10255 --collection=stockoma
```

## npm scripts

```
# pongit Synology
npm t

# Nassimodo
npm run steven

# Vagrant box
npm run vagrant
```
