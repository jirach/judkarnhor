import * as functions from 'firebase-functions';
import * as express from 'express';
import {Application} from 'express';

// Initiate function
const functionBuilder = functions.region('asia-east2').https;
const api: Application = express();

// Create if not exist --------------------------------------------------------
api.get('/createIfNotExist', (request:functions.Request, response: functions.Response) => {
  response.send('Hello from Firebase default');
});

// Get my user ----------------------------------------------------------------
api.get('/', (request:functions.Request, response: functions.Response) => {
  response.send('Hello from Firebase default');
});

const user = functionBuilder.onRequest(api);

export default user;
