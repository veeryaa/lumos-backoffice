import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

type AuthBody = {
  email: string;
  password: string;
};

const AuthController = {
  auth: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      await axios.post('http://localhost:8000/auth/verifyToken/', {
        token: jwt,
      });

      res.redirect('/home');
    } catch (err) {
      res.redirect('/login');
    }
  },
  loginRedirect: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      await axios.post(`http://localhost:8000/auth/verifyToken/`, {
        token: jwt,
      });

      res.redirect('/home');
    } catch (err) {
      res.render('auth');
    }
  },
  home: async function (req: Request, res: Response): Promise<void> {
    try {
      const { jwt } = req.cookies;

      const response = await axios.post(`http://localhost:8000/auth/verifyToken/`, {
        token: jwt,
      });

      if (response.data.status === 200) {
        const response = await axios.get('http://localhost:8000/api/transaction/listrecommendation')
        
        res.render('home', { nav: 'home', data: response.data.result.read, trxCount: response.data.result.trxCount });
      }

    } catch (err) {
      res.redirect('/login');
    }
  },
  login: async function (req: Request, res: Response): Promise<void> {
    try {
      const COOKIE_DURATION: number = 24 * 60 * 60 * 180;
      const { email, password }: AuthBody = req.body;
      const response: AxiosResponse = await axios.post(`http://localhost:8000/auth/login`, {
        username: email,
        password,
      });
      console.log(response)
      res.cookie('employee_id', response.data.employee_id, {
        maxAge: COOKIE_DURATION,
        httpOnly: true,
      });
      res.cookie('jwt', response.data.token, { maxAge: COOKIE_DURATION });
      res.cookie('email', response.data.email, { maxAge: COOKIE_DURATION, httpOnly: true });
      res.cookie('role', response.data.role, { maxAge: COOKIE_DURATION, httpOnly: true });

      res.redirect('/home');
    } catch (err) {
      console.log(err.response)
      res.redirect('/login');
    }
  },
  logout: function (req: Request, res: Response): void {
    res.clearCookie('employee_id');
    res.clearCookie('jwt');
    res.clearCookie('email');
    res.clearCookie('role');
    res.redirect('/login');
  },
};

export default AuthController;
