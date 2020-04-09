const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

async function connect() {
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.set('useCreateIndex', true);

  await mongoose.connect(uri, mongooseOpts);
}

async function close() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

async function insertIn(collectionName, data = {}) {
  const collection = mongoose.connection.collection(collectionName);
  await collection.insertOne(data);
}

async function clearDb() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    if (key) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
}

module.exports = {
  connect,
  close,
  clearDb,
  insertIn,
};
