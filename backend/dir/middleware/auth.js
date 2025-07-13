"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verfyToken = (req, res, next) => {
    const token = req.cookies['auth_token'];
    if (!token) {
        res.status(401).json({ message: "unathorized" });
        return;
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRETE_KEY);
        req.userId = decode.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'unauthorized' });
        return;
    }
};
exports.default = verfyToken;
