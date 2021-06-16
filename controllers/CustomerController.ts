import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const CustomerController = {
  view: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });
      
      if (response.data.status === 200) {
        if (req.query.member) {
          const customer = await axios.get(
            `http://localhost:8000/api/customer/read/${req.query.member}?page=${req.query.page}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          let pagination = Math.ceil(customer.data.count / 10);
          if (pagination === 0) pagination = 1;

          console.log(customer.data.result);

          res.render('customer/view', {
            nav: 'customer',
            data: customer.data.result,
            pagination,
            member: req.query.member,
          });
        } else {
          console.log('TEST CUSTOMER ALL');
          const customer = await axios.get(
            `http://localhost:8000/api/customer/read?page=${req.query.page}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
            
          let pagination = Math.ceil(customer.data.count / 10);
          if (pagination === 0) pagination = 1;

          res.render('customer/view', {
            nav: 'customer',
            data: customer.data.result,
            pagination,
            member: null,
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
        const customer = await axios.get(
          `http://localhost:8000/api/customer/find/${req.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        console.log('------ customer');
        console.log(customer.data.result);

        res.render('customer/edit', { nav: 'customer', data: customer.data.result });
      }
    } catch (err) {
      res.redirect('/login');
    }
  }, 
};

export default CustomerController;