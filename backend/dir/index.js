"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const mongoUri = process.env.MONGO_DB_CONNECTION;
if (!mongoUri) {
    throw new Error('MONGO_DB_CONNECTION environment variable is not defined.');
}
mongoose_1.default.connect(mongoUri)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URI,
    credentials: true
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.listen(7000, () => {
    console.log('Server is running on local server 7000');
});
