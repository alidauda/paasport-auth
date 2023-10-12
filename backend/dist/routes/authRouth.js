"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    if (req.user) {
        res.send('hello');
    }
    res.send('hi no user');
});
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['email', 'profile'],
}));
router.get('/google/callback', passport_1.default.authenticate('google', {}), (req, res) => {
    res.redirect('http://localhost:5173');
});
exports.default = router;
//# sourceMappingURL=authRouth.js.map