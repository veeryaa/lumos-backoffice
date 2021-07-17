"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const CouponController_1 = __importDefault(require("../controllers/CouponController"));
const CustomerController_1 = __importDefault(require("../controllers/CustomerController"));
const EmployeeController_1 = __importDefault(require("../controllers/EmployeeController"));
const MembershipController_1 = __importDefault(require("../controllers/MembershipController"));
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const TrxController_1 = __importDefault(require("../controllers/TrxController"));
const router = express_1.Router();
// AuthController
router.get('/', AuthController_1.default.auth);
router.get('/home', AuthController_1.default.home);
router.get('/login', AuthController_1.default.loginRedirect);
router.post('/login', AuthController_1.default.login);
router.post('/logout', AuthController_1.default.logout);
// ProductController
router.get('/product/view', ProductController_1.default.view);
router.get('/product/edit/:id', ProductController_1.default.edit);
router.get('/product/insert', ProductController_1.default.insertView);
router.post('/product/insert', ProductController_1.default.insert);
// EmployeeController
router.get('/employee/view', EmployeeController_1.default.view);
router.get('/employee/edit/:id', EmployeeController_1.default.edit);
router.get('/employee/insert', EmployeeController_1.default.insertView);
router.post('/employee/insert', EmployeeController_1.default.insert);
// CouponController
router.get('/coupon/view', CouponController_1.default.view);
router.get('/coupon/edit/:id', CouponController_1.default.edit);
router.get('/coupon/insert', CouponController_1.default.insertView);
router.post('/coupon/insert', CouponController_1.default.insert);
// MembershipController
router.get('/membership/view', MembershipController_1.default.view);
router.get('/membership/edit/:id', MembershipController_1.default.edit);
router.get('/membership/insert', MembershipController_1.default.insertView);
router.post('/membership/insert', MembershipController_1.default.insert);
// CustomerController
router.get('/customer/view', CustomerController_1.default.view);
router.get('/customer/edit/:id', CustomerController_1.default.edit);
// TrxController
router.get('/trx/view', TrxController_1.default.view);
router.get('/trx/edit/:id', TrxController_1.default.edit);
router.post('/trx/recommendation', TrxController_1.default.recommendation);
router.post('/trx/export', TrxController_1.default.export);
exports.default = router;
