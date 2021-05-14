require('dotenv').config()
const express = require('express');
const app = express();
const MongoStore = require('connect-mongo');

const options = {
  useNewUrlParser: true, // говорим mongoose, что строка подключения будет в новом формате (новый формат должен обязательно содеражт порт)
  useFindAndModify: false, // заставляем методы findOneAndUpdate() и findOneAndRemove() использовать нативный (т.е предоставленный самой mongodb) метод findOneAndUpdate() вместо findAndModify()
  useCreateIndex: true, // Заставляем mongoose работать с функцией createIndex() драйвера mongodb вместо ensureIndex(). Так как последний помечен драйвером mongodb, как устаревший
  useUnifiedTopology: true, // заставляем mongoose использование новый механизм управления подключением драйвера mongodb.
  poolSize: 10, // максимальное количество сокетов, которые драйвер MongoDB будет держать открытыми для этого соединения
  bufferMaxEntries: 0, // говорим mongoose перестать выполнять любые операции с базой данных, после того как произодет отключение от последней.
  // В противном случае mongoose пытается дождаться восстановления соездинения, для завершения  операций
}


const {DB_HOST, DB_NAME, DB_PORT, secretKey, mongoDBurl} = process.env

const dbConnectionURL = process.env.NODE_ENV === "production" ? mongoDBurl : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const sessionConfig = {
  name: app.get('cookiname'),
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConnectionURL,
  }),
  cookie: {
    httpOnly: true,
    maxAge: 90000 * 1e3,
  },
};

module.exports = {
  options,
  dbConnectionURL,
  sessionConfig
}
