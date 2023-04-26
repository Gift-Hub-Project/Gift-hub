const client = require('./client');
const {rebuildDb} = require('./seedData');

rebuildDb()
  .catch(console.error)
  .finally(() => client.end());