import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'MacBook-Pro.local',
  user: 'devUser',
  password: 'dbSpy3.0',
  database: 'dbspy-mysql',
  port: '3306',
});
//
//
//
//MIDDLEWARE FUNCTIONS
const API = {};

API.getItems = (req, res, next) => {
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

API.addItem = (req, res, next) => {
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

API.removeItem = (req, res, next) => {
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

export default API;
