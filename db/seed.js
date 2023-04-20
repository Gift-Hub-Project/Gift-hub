const Client = require('./client');
const { rebuildTables, dropTables, createTables, rebuildDb} = require('./seedData');

rebuildDb()
  .catch(console.error)
  .finally(() => Client.end());