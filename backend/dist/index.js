"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
require("dotenv/config");
const authRouth_1 = __importDefault(require("./routes/authRouth"));
const passport_1 = __importDefault(require("passport"));
require("./passport");
const app = (0, express_1.default)();
const client = new ioredis_1.default(process.env.RedisURL);
let redisStore = new connect_redis_1.default({
    client: client,
    prefix: "myapp:",
});
app.set("trust proxy", 1);
app.use((0, express_session_1.default)({
    store: redisStore,
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", authRouth_1.default);
app.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(req.user);
    });
});
app.listen(4000, () => {
    console.log("server started on localhost:4000");
});
//# sourceMappingURL=index.js.map