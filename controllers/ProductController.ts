import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

type ProductBody = {};

const ProductController = {
  view: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      if (response.data.status === 200) {
        if (req.query.kategori) {
          const product = await axios.get(
            `http://localhost:8000/api/product/read/${req.query.kategori}?page=${req.query.page}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          let pagination = Math.ceil(product.data.count / 10);
          
          if (pagination === 0) pagination = 1;

          res.render('product/view', {
            nav: 'product',
            data: product.data.result,
            pagination,
            kategori: req.query.kategori,
          });
        } else {
          const product = await axios.get(
            `http://localhost:8000/api/product/read?page=${req.query.page}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          let pagination = Math.ceil(product.data.count / 10);
          
          if (pagination === 0) pagination = 1;

          res.render('product/view', {
            nav: 'product',
            data: product.data.result,
            pagination,
            kategori: null,
          });
        }
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
        const product = await axios.get(`http://localhost:8000/api/product/find/${req.params.id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log('------ PRODUCT');
        console.log(product.data.result);

        res.render('product/edit', { nav: 'product', data: product.data.result });
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
        res.render('product/insert', { nav: 'product' });
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

      if (response.data.status === 200) {
        console.log(req.body);

        await axios.post('http://localhost:8000/api/product/create', req.body, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });

        req.flash('msg', 'Data berhasil ditambahkan.');
        res.redirect('/product/insert');
      }
    } catch (err) {
      req.flash('err', 'Gagal untuk menambah data.');
      res.redirect('/product/insert');
    }
  },
};

export default ProductController;
