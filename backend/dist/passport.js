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
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const db_1 = require("./utils/db");
require("dotenv/config");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
}, function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db_1.db.user.findUnique({
                where: {
                    email: profile.emails[0].value,
                },
            });
            if (!user) {
                const newUser = yield db_1.db.user.create({
                    data: {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        image_url: profile.profileUrl,
                    },
                });
                if (newUser) {
                    done(null, newUser);
                }
                else {
                    done(new Error("Failed to create new user."));
                }
            }
            else {
                done(null, user);
            }
        }
        catch (error) {
            done(error);
        }
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db.user.findUnique({
        where: {
            id: id,
        },
    });
    done(null, user);
}));
//# sourceMappingURL=passport.js.map