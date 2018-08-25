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

## npm scripts

```
# pongit Synology
npm t

# Nassimodo
npm run steven

# Vagrant box
npm run vagrant
```
