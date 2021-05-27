import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

type MembershipBody = {};

const MembershipController = {
  view: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      if (response.data.status === 200) {
        const membership = await axios.get('http://localhost:8000/api/membership/read/', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        res.render('membership/view', { nav: 'membership', data: membership.data.result });
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
        const membership = await axios.get(`http://localhost:8000/api/membership/find/${req.params.id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log('------ MEMBERSHIP');
        console.log(membership.data.result);

        res.render('membership/edit', { nav: 'membership', data: membership.data.result });
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
        res.render('membership/insert', { nav: 'membership' });
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
        console.log('---BODY MEMBERSHIP');
        console.log(req.body);

        await axios.post('http://localhost:8000/api/membership/create', req.body, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });

        req.flash('msg', 'Data berhasil ditambahkan.');
        res.redirect('/membership/insert');
      }
    } catch (err) {
      req.flash('err', 'Gagal untuk menambah data.');
      res.redirect('/membership/insert');
    }
  },
};

export default MembershipController;
