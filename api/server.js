const client  = require('../db/client');
const express = require('express');
const server = express();
const apiRouter = require('./api');
const morgan = require('morgan');
const path = require('path');


server.use('/dist',express.static(path.join(__dirname, "../dist")));
server.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../public', 'index.html')));

server.use(morgan('dev'))
server.use('/api', apiRouter);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
 client.connect();
  console.log(`listening on port ${PORT}`);
});