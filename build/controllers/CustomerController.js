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
const CustomerController = {
    view: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    if (req.query.member) {
                        const customer = yield axios_1.default.get(`http://localhost:8000/api/customer/read/${req.query.member}?page=${req.query.page}`, {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            },
                        });
                        let pagination = Math.ceil(customer.data.count / 10);
                        if (pagination === 0)
                            pagination = 1;
                        console.log(customer.data.result);
                        res.render('customer/view', {
                            nav: 'customer',
                            data: customer.data.result,
                            pagination,
                            member: req.query.member,
                        });
                    }
                    else {
                        console.log('TEST CUSTOMER ALL');
                        const customer = yield axios_1.default.get(`http://localhost:8000/api/customer/read?page=${req.query.page}`, {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            },
                        });
                        let pagination = Math.ceil(customer.data.count / 10);
                        if (pagination === 0)
                            pagination = 1;
                        res.render('customer/view', {
                            nav: 'customer',
                            data: customer.data.result,
                            pagination,
                            member: null,
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
                    const customer = yield axios_1.default.get(`http://localhost:8000/api/customer/find/${req.params.id}`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    console.log('------ customer');
                    console.log(customer.data.result);
                    res.render('customer/edit', { nav: 'customer', data: customer.data.result });
                }
            }
            catch (err) {
                res.redirect('/login');
            }
        });
    },
};
exports.default = CustomerController;
