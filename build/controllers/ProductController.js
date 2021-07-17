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
const ProductController = {
    view: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    if (req.query.kategori) {
                        const product = yield axios_1.default.get(`http://localhost:8000/api/product/read/${req.query.kategori}?page=${req.query.page}`, {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            },
                        });
                        let pagination = Math.ceil(product.data.count / 10);
                        if (pagination === 0)
                            pagination = 1;
                        res.render('product/view', {
                            nav: 'product',
                            data: product.data.result,
                            pagination,
                            kategori: req.query.kategori,
                        });
                    }
                    else {
                        const product = yield axios_1.default.get(`http://localhost:8000/api/product/read?page=${req.query.page}`, {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            },
                        });
                        let pagination = Math.ceil(product.data.count / 10);
                        if (pagination === 0)
                            pagination = 1;
                        res.render('product/view', {
                            nav: 'product',
                            data: product.data.result,
                            pagination,
                            kategori: null,
                        });
                    }
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
                    const product = yield axios_1.default.get(`http://localhost:8000/api/product/find/${req.params.id}`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    console.log('------ PRODUCT');
                    console.log(product.data.result);
                    res.render('product/edit', { nav: 'product', data: product.data.result });
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
                    res.render('product/insert', { nav: 'product' });
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
                    console.log(req.body);
                    yield axios_1.default.post('http://localhost:8000/api/product/create', req.body, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    req.flash('msg', 'Data berhasil ditambahkan.');
                    res.redirect('/product/insert');
                }
            }
            catch (err) {
                req.flash('err', 'Gagal untuk menambah data.');
                res.redirect('/product/insert');
            }
        });
    },
};
exports.default = ProductController;
