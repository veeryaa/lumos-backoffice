import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

type EmployeeBody = {};

const EmployeeController = {
  view: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });
      console.log('OUTSIDE ROLE')
      if (response.data.status === 200) {
        if (req.query.role) {
          const employee = await axios.get(
            `http://localhost:8000/api/employee/read/${req.query.role}?page=${req.query.page}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          const pagination = Math.ceil(employee.data.count / 10);

            console.log(employee.data.result);

          res.render('employee/view', {
            nav: 'employee',
            data: employee.data.result,
            pagination,
            role: req.query.role,
          });
        } else {
          console.log('TEST ROLE 2')
          const employee = await axios.get(
            `http://localhost:8000/api/employee/read?page=${req.query.page}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          const pagination = Math.ceil(employee.data.count / 10);
          res.render('employee/view', {
            nav: 'employee',
            data: employee.data.result,
            pagination,
            role: null,
          });
        }
      }
    } catch (err) {
      res.redirect('/login');
    }
  },
  viewRole: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;
      const { kategori } = req.params;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      if (response.data.status === 200) {
        const employee = await axios.get(`http://localhost:8000/api/employee/read/${kategori}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log(' --kategori employee');
        console.log(employee.data);

        res.render('employee/view', { nav: 'employee', data: employee.data.result });
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
        const employee = await axios.get(
          `http://localhost:8000/api/employee/find/${req.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        console.log('------ EMPLOYEE');
        console.log(employee.data.result);

        res.render('employee/edit', { nav: 'employee', data: employee.data.result });
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
        res.render('employee/insert', { nav: 'employee' });
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
        console.log('---BODY');
        console.log(req.body);

        await axios.post('http://localhost:8000/api/employee/create', req.body, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });

        req.flash('msg', 'Data berhasil ditambahkan.');
        res.redirect('/employee/insert');
      }
    } catch (err) {
      res.redirect('/login');
    }
  },
};

export default EmployeeController;
