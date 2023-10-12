import RedisStore from 'connect-redis';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'dotenv/config';
import authRoutes from './routes/authRouth';
import passport from 'passport';
import './passport';
import cors from 'cors';

const app = express();

const client = new Redis(process.env.RedisURL!);
let redisStore = new RedisStore({
  client: client,
  prefix: 'myapp:',
});
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    store: redisStore,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.get('/', async function (req, res) {
  console.log(req.user);
  // const user = await db.user.findUnique({
  //   where: {
  //     id: req.user?.id,
  //   },
  // });
  res.send({ user: req.user, me: '9e8a0eae-62d6-4d40-ab36-2e7c05f3ec8d' });
});
app.use('/auth', authRoutes);
app.listen(4000, () => {
  console.log('server started on localhost:4000');
});
