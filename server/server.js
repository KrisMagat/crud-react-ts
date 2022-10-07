const port = '3000';
import mysql from 'mysql2';

import express from 'express';
const app = express();

const pool = mysql.createPool({
  host: 'MacBook-Pro.local',
  user: 'devUser',
  password: 'dbSpy3.0',
  database: 'dbspy-mysql',
  port: '3306',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware functions
const getList = (req, res, next) => {
  const queryString = 'SELECT * FROM runs;';
  pool.query(queryString, (error, results, fields) => {
    if (error) {
      console.log('MYSQL API ERROR', err);
      return next(err);
    }
    res.locals.data = results;
    return next();
  });
};

const addItem = (req, res, next) => {
  const queryString = `INSERT INTO runs (date, distance, time) VALUES (?,?,?);`;
  const values = req.body.string;
  pool.query(queryString, values, (error, results, fields) => {
    if (error) {
      console.log('MYSQL API ERROR', err);
      return next(err);
    }
    res.locals.data = results;
    return next();
  });
};

const removeItem = (req, res, next) => {
  const id = req.query.id;
  const queryString = `DELETE FROM runs WHERE id = ${req.query.id}`;
  pool.query(queryString, (error, results, fields) => {
    if (error) {
      console.log('MYSQL API ERROR', err);
      return next(error);
    }
    res.locals.data = results;
    return next();
  });
};

//serve mySQL db calls
// app.get('/testdb', testDB, (req, res) => {
//   res.status(200).send('Success');
// });

app.get('/db', getList, (req, res) => {
  console.log(res.locals.data);
  return res.status(200).send(res.locals.data);
});
app.post('/db', addItem, (req, res) => res.status(200).send(res.locals.data));
app.delete('/db', removeItem, (req, res) =>
  res.status(200).send(res.locals.data)
);

app.listen(port);
console.log('listening on port ', port);
