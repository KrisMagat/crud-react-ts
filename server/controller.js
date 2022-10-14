import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import SQLToJsonSchemaConvertor from 'sqema';

const controller = {};

controller.getSchema = async (req, res, next) => {
  console.log('REQ.BODY', req.body);
  const convertor = new SQLToJsonSchemaConvertor('postgres', req.body);
  const output = './server/db_schemas';
  await convertor
    .generateJsonSchemas()
    .then(() => convertor.writeJsonSchemas(output, 'single-file', 'json'))
    .catch((err) => {
      console.log('Error in controller', err);
      return next({ Error: err });
    });
  const filename = path.join(
    __dirname,
    `./db_schemas/${req.body.database}.json`
  );
  fs.readFile(filename, 'utf8', (error, data) => {
    if (error) {
      console.error(`error- in FS: ${error.message}`);
      return next({
        msg: 'Error reading database schema file',
        err: error,
      });
    }
    res.locals.data = data;
    return next();
  });
};

export default controller;
