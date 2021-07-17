"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const app = express_1.default();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(express_session_1.default({ secret: 'hello', resave: false, saveUninitialized: true }));
app.use(express_flash_1.default());
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`It's running! PORT: ${process.env.PORT}`);
});
