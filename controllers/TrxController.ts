import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TrxController = {
  view: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      if (response.data.status === 200) {
        const trx = await axios.get(
          `http://localhost:8000/api/transaction/read?page=${req.query.page}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        let pagination = Math.ceil(trx.data.count / 25);
        if (pagination === 0) pagination = 1;

        res.render('trx/view', {
          nav: 'trx',
          data: trx.data.result,
          pagination,
        });
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
        console.log(req.params.id);
        const trx = await axios.get(`http://localhost:8000/api/transaction/read/${req.params.id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        res.render('trx/edit', { nav: 'trx', data: trx.data.result });
      }
    } catch (err) {
      console.log(err);
      res.redirect('/login');
    }
  },
  recommendation: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      if (response.data.status === 200) {
        console.log(req.body);
        console.log(req.cookies.employee_id);
        const rec = await axios.post(`http://localhost:8000/api/transaction/recommendation`, {
          support: req.body.support,
          confidence: req.body.confidence,
          total_data: req.body.total_data,
          employee_id: req.cookies.employee_id,
        });
        req.flash('code', `${response.data.status}`);
        req.flash('info', `${rec.data.msg}`);
      }
      res.redirect('/home');
    } catch (err) {
      req.flash('code', `${err.response.data.status}`);
      req.flash('info',`${err.response.data.msg}`);
      res.redirect('/login');
    }
  },
};

export default TrxController;
