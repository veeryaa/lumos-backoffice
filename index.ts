import express, { Application } from 'express';
import router from './routes/routes';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import flash from 'express-flash';
import session from 'express-session';

dotenv.config();
const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'hello', resave: false, saveUninitialized: true }));
app.use(flash());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(router);

app.listen(process.env.PORT, (): void => {
  console.log(`It's running! PORT: ${process.env.PORT}`);
});
