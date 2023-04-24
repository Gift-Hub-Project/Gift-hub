const Client = require('./client'); // very minor, I'd name this with a lower case c (client) just for consistency across your backend
const { rebuildTables, dropTables, createTables, rebuildDb} = require('./seedData'); // We only need the rebuildDb function, we can remove these other functions from both this import and our export

rebuildDb()
  .catch(console.error)
  .finally(() => Client.end());