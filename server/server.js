const port = '3000';
import express from 'express';
const app = express();
import API from './db.js';
import controller from './controller.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
//
//
//API CALLS TO DATABASE
app.get('/db', API.getItems, (req, res) =>
  res.status(200).send(res.locals.data)
);
app.post('/db', API.addItem, (req, res) =>
  res.status(200).send(res.locals.data)
);
app.delete('/db', API.removeItem, (req, res) =>
  res.status(200).send(res.locals.data)
);
//
//
//
//PG API CALLS TO DB
app.post('/pgapi', controller.getSchema, (req, res) =>
  // res.sendStatus(200)
  res.status(200).send(res.locals.data)
);
//
//
//
app.listen(port);
console.log('listening on port ', port);
