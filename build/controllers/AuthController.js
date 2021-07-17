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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AuthController = {
    auth: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                res.redirect('/home');
            }
            catch (err) {
                res.redirect('/login');
            }
        });
    },
    loginRedirect: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                yield axios_1.default.post(`http://localhost:8000/auth/verifyToken/`, {
                    token: jwt,
                });
                res.redirect('/home');
            }
            catch (err) {
                res.render('auth');
            }
        });
    },
    home: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post(`http://localhost:8000/auth/verifyToken/`, {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    const response = yield axios_1.default.get('http://localhost:8000/api/transaction/listrecommendation');
                    res.render('home', { nav: 'home', data: response.data.result.read, trxCount: response.data.result.trxCount });
                }
            }
            catch (err) {
                res.redirect('/login');
            }
        });
    },
    login: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const COOKIE_DURATION = 24 * 60 * 60 * 180;
                const { email, password } = req.body;
                const response = yield axios_1.default.post(`http://localhost:8000/auth/login`, {
                    username: email,
                    password,
                });
                console.log(response);
                res.cookie('employee_id', response.data.employee_id, {
                    maxAge: COOKIE_DURATION,
                    httpOnly: true,
                });
                res.cookie('jwt', response.data.token, { maxAge: COOKIE_DURATION });
                res.cookie('email', response.data.email, { maxAge: COOKIE_DURATION, httpOnly: true });
                res.cookie('role', response.data.role, { maxAge: COOKIE_DURATION, httpOnly: true });
                res.redirect('/home');
            }
            catch (err) {
                console.log(err.response);
                res.redirect('/login');
            }
        });
    },
    logout: function (req, res) {
        res.clearCookie('employee_id');
        res.clearCookie('jwt');
        res.clearCookie('email');
        res.clearCookie('role');
        res.redirect('/login');
    },
};
exports.default = AuthController;
