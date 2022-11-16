const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require('./config/config');
const postRouter = require('./routes/post-routes');

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
  <h2>Hello World!<h2>
  <h4>App listening on port ${port}...</h4>
  `);
});

app.use('/api/v1/posts', postRouter);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log('✔ Database connection has been established successfully.');
    app.listen(port, () => {
      console.log(`✔ App listening on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error('✖ Unable to connect to the database :\n', err);
    process.exit(1);
  });
