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
const EmployeeController = {
    view: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                console.log('OUTSIDE ROLE');
                if (response.data.status === 200) {
                    if (req.query.role) {
                        const employee = yield axios_1.default.get(`http://localhost:8000/api/employee/read/${req.query.role}?page=${req.query.page}`, {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            },
                        });
                        let pagination = Math.ceil(employee.data.count / 10);
                        if (pagination === 0)
                            pagination = 1;
                        res.render('employee/view', {
                            nav: 'employee',
                            data: employee.data.result,
                            pagination,
                            role: req.query.role,
                        });
                    }
                    else {
                        console.log('TEST ROLE 2');
                        const employee = yield axios_1.default.get(`http://localhost:8000/api/employee/read?page=${req.query.page}`, {
                            headers: {
                                Authorization: `Bearer ${jwt}`,
                            },
                        });
                        let pagination = Math.ceil(employee.data.count / 10);
                        if (pagination === 0)
                            pagination = 1;
                        res.render('employee/view', {
                            nav: 'employee',
                            data: employee.data.result,
                            pagination,
                            role: null,
                        });
                    }
                }
            }
            catch (err) {
                res.redirect('/login');
            }
        });
    },
    viewRole: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jwt } = req.cookies;
                const { kategori } = req.params;
                const response = yield axios_1.default.post('http://localhost:8000/auth/verifyToken/', {
                    token: jwt,
                });
                if (response.data.status === 200) {
                    const employee = yield axios_1.default.get(`http://localhost:8000/api/employee/read/${kategori}`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    console.log(' --kategori employee');
                    console.log(employee.data);
                    res.render('employee/view', { nav: 'employee', data: employee.data.result });
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
                    const employee = yield axios_1.default.get(`http://localhost:8000/api/employee/find/${req.params.id}`, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    console.log('------ EMPLOYEE');
                    console.log(employee.data.result);
                    res.render('employee/edit', { nav: 'employee', data: employee.data.result });
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
                    res.render('employee/insert', { nav: 'employee' });
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
                    console.log('---BODY');
                    console.log(req.body);
                    yield axios_1.default.post('http://localhost:8000/api/employee/create', req.body, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    req.flash('msg', 'Data berhasil ditambahkan.');
                    res.redirect('/employee/insert');
                }
            }
            catch (err) {
                res.redirect('/login');
            }
        });
    },
};
exports.default = EmployeeController;
