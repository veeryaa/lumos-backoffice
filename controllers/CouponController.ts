import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

type CouponBody = {};

const CouponController = {
  view: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      if (response.data.status === 200) {
        const coupon = await axios.get('http://localhost:8000/api/coupon/read/', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        res.render('coupon/view', { nav: 'coupon', data: coupon.data.result });
      }
    } catch (err) {
      res.redirect('/login');
    }
  },
  edit: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      if (response.data.status === 200) {
        const coupon = await axios.get(`http://localhost:8000/api/coupon/find/${req.params.id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const product = await axios.get(`http://localhost:8000/api/product/read/`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log(coupon.data.result)

        res.render('coupon/edit', {
          nav: 'coupon',
          data: coupon.data.result,
          support: product.data.result,
        });
      }
    } catch (err) {
      res.redirect('/login');
    }
  },
  insertView: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      if (response.data.status === 200) {
        const product = await axios.get(`http://localhost:8000/api/product/read?page=0`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        res.render('coupon/insert', { nav: 'coupon', support: product.data.result });
      }
    } catch (err) {
      res.redirect('/login');
    }
  },  
  insert: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      console.log(req.body)

      if (response.data.status === 200) {
        await axios.post('http://localhost:8000/api/coupon/create', req.body, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });

        req.flash('msg', 'Data berhasil ditambahkan.');
        res.redirect('/coupon/insert');
      }
    } catch (err) {
      console.log(err)
      res.redirect('/login');
    }
  },
};

export default CouponController;
