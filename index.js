const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require('./config/config');
const postRouter = require('./routes/post-routes');
const userRouter = require('./routes/user-routes');
const protect = require('./middlewares/auth-middleware');

// redis@v3
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const port = process.env.PORT || 3000;

const app = express();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 2,
      resave: false,
      saveUninitialized: false,
    },
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
  <h2>Hello World!<h2>
  <h4>App listening on port ${port}...</h4>
  `);
});

app.use('/api/v1/posts', protect, postRouter);
app.use('/api/v1/users', userRouter);

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
