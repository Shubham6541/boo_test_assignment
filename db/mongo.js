const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const dbConnect = async () => {
    const server = await MongoMemoryServer.create();
    const mongoUri = server.getUri();

    await mongoose.connect(mongoUri, { dbName: 'booWorldDb' });
    console.log(`MongoDB connected to : ${mongoUri}`);
}

module.exports = {
    dbConnect
}