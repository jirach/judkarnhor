import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import auth from '../utils/auth';

// Initiate function
const functionBuilder = functions.region('asia-east2').https;
const api: express.Application = express();
api.use(cors({origin: true}));

// API Endpoints
api.get('/', (request:functions.Request, response: functions.Response) => {
  response.send('Hello from Firebase default');
});

api.get('/one', (request:functions.Request, response: functions.Response) => {
  response.send('Hello from Firebase 1');
});

api.get('/auth', auth, (request:functions.Request, response: functions.Response) => {
  response.send('Hello from Firebase 2');
});

// Export module
const healthz = functionBuilder.onRequest(api);
export default healthz;
