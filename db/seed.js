const Client = require('./client');
const { rebuildTables, dropTables, createTables} = require('./seedData');

rebuildTables()
  .catch(console.error)
  .finally(() => Client.end());