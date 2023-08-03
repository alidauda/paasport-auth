import RedisStore from "connect-redis";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "dotenv/config";
import authRoutes from "./routes/authRouth";
import passport from "passport";
import "./passport";

const app = express();
const client = new Redis(process.env.RedisURL!);
let redisStore = new RedisStore({
  client: client,
  prefix: "myapp:",
});
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    store: redisStore,
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.get("/", async function (req, res) {
  res.send(req.user);
});

app.listen(4000, () => {
  console.log("server started on localhost:4000");
});
