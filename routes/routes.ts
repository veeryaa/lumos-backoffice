import { Router } from 'express';
import AuthController  from '../controllers/AuthController';
import CouponController from '../controllers/CouponController';
import CustomerController from '../controllers/CustomerController';
import EmployeeController from '../controllers/EmployeeController';
import MembershipController from '../controllers/MembershipController';
import ProductController from '../controllers/ProductController';
import TrxController from '../controllers/TrxController';

const router = Router();

// AuthController
router.get('/', AuthController.auth);
router.get('/home', AuthController.home);
router.get('/login', AuthController.loginRedirect);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

// ProductController
router.get('/product/view', ProductController.view);
router.get('/product/edit/:id', ProductController.edit);
router.get('/product/insert', ProductController.insertView);
router.post('/product/insert', ProductController.insert);

// EmployeeController
router.get('/employee/view', EmployeeController.view);
router.get('/employee/edit/:id', EmployeeController.edit);
router.get('/employee/insert', EmployeeController.insertView);
router.post('/employee/insert', EmployeeController.insert);

// CouponController
router.get('/coupon/view', CouponController.view);
router.get('/coupon/edit/:id', CouponController.edit);
router.get('/coupon/insert', CouponController.insertView);
router.post('/coupon/insert', CouponController.insert);

// MembershipController
router.get('/membership/view', MembershipController.view);
router.get('/membership/edit/:id', MembershipController.edit);
router.get('/membership/insert', MembershipController.insertView);
router.post('/membership/insert', MembershipController.insert)

// CustomerController
router.get('/customer/view', CustomerController.view);
router.get('/customer/edit/:id', CustomerController.edit);

// TrxController
router.get('/trx/view', TrxController.view);
router.get('/trx/edit/:id', TrxController.edit);
router.post('/trx/recommendation', TrxController.recommendation);
router.post('/trx/export', TrxController.export);

export default router;