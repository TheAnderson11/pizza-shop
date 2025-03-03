const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017/pizzasBox';
let dbConnection = null;

module.exports = {
  connectToDb: cb => {
    MongoClient.connect(URL)
      .then(client => {
        console.log('Connected to MongoDB'); // Исправлена опечатка
        dbConnection = client.db();
        cb(null); // Сообщаем, что ошибки нет
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        cb(err); // Передаем ошибку в callback
      });
  },
  getDb: () => {
    if (!dbConnection) {
      throw new Error('Database not initialized. Call connectToDb first.');
    }
    return dbConnection;
  },
};
