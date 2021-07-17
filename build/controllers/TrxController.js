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
const TrxController = {
    view: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    const trx = yield axios_1.default.get(`http://localhost:8000/api/transaction/read?page=${req.query.page}`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    let pagination = Math.ceil(trx.data.count / 25);
                    if (pagination === 0)
                        pagination = 1;
                    res.render('trx/view', {
                        nav: 'trx',
                        data: trx.data.result,
                        pagination,
                    });
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
                    console.log(req.params.id);
                    const trx = yield axios_1.default.get(`http://localhost:8000/api/transaction/read/${req.params.id}`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    res.render('trx/edit', { nav: 'trx', data: trx.data.result });
                }
            }
            catch (err) {
                console.log(err);
                res.redirect('/login');
            }
        });
    },
    recommendation: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    console.log(req.body);
                    console.log(req.cookies.employee_id);
                    const rec = yield axios_1.default.post(`http://localhost:8000/api/transaction/recommendation`, {
                        support: req.body.support,
                        confidence: req.body.confidence,
                        total_data: req.body.total_data,
                        employee_id: req.cookies.employee_id,
                    });
                    req.flash('code', `${response.data.status}`);
                    req.flash('info', `${rec.data.msg}`);
                }
                res.redirect('/home');
            }
            catch (err) {
                req.flash('code', `${err.response.data.status}`);
                req.flash('info', `${err.response.data.msg}`);
                res.redirect('/login');
            }
        });
    },
    export: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    const csv = yield axios_1.default.post(`http://localhost:8000/api/transaction/export`, {
                        tglawal: req.body.tglawal,
                        tglakhir: req.body.tglakhir,
                    });
                    req.flash('code', `${response.data.status}`);
                    req.flash('info', `Berhasil melakukan export data sebanyak ${csv.data.count}`);
                    res.redirect('/home');
                }
            }
            catch (err) {
                console.log(err);
                req.flash('code', `${err.response.data.status}`);
                req.flash('info', 'Gagal untuk melakukkan export.');
                res.redirect('/login');
            }
        });
    },
};
exports.default = TrxController;
