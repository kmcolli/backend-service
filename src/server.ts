import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import {router as productRouter} from './product'

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(productRouter);

app.listen(8080, () => {
  return console.log('My Node App listening on port 8080');
});
