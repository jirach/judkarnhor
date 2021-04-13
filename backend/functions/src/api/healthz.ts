import * as functions from 'firebase-functions';
import * as express from 'express';
import {Application} from 'express';

// Initiate function
const functionBuilder = functions.region('asia-east2').https;
const api: Application = express();

// API Endpoints
api.get('/', (request:functions.Request, response: functions.Response) => {
  response.send('Hello from Firebase default');
});

api.get('/one', (request:functions.Request, response: functions.Response) => {
  response.send('Hello from Firebase 1');
});

api.get('/two', (request:functions.Request, response: functions.Response) => {
  response.send('Hello from Firebase 2');
});

export const healthz = functionBuilder.onRequest(api);
