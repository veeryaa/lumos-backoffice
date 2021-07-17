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
const MembershipController = {
    view: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    const membership = yield axios_1.default.get('http://localhost:8000/api/membership/read/', {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    res.render('membership/view', { nav: 'membership', data: membership.data.result });
                }
            }
            catch (err) {
                res.redirect('/login');
            }
        });
    },
    edit: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    const membership = yield axios_1.default.get(`http://localhost:8000/api/membership/find/${req.params.id}`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    console.log('------ MEMBERSHIP');
                    console.log(membership.data.result);
                    res.render('membership/edit', { nav: 'membership', data: membership.data.result });
                }
            }
            catch (err) {
                res.redirect('/login');
            }
        });
    },
    insertView: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    res.render('membership/insert', { nav: 'membership' });
                }
            }
            catch (err) {
                res.redirect('/login');
            }
        });
    },
    insert: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    console.log('---BODY MEMBERSHIP');
                    console.log(req.body);
                    yield axios_1.default.post('http://localhost:8000/api/membership/create', req.body, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    req.flash('msg', 'Data berhasil ditambahkan.');
                    res.redirect('/membership/insert');
                }
            }
            catch (err) {
                req.flash('err', 'Gagal untuk menambah data.');
                res.redirect('/membership/insert');
            }
        });
    },
};
exports.default = MembershipController;
