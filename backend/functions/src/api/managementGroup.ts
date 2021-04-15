import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import auth from '../utils/auth';
import {db} from '../utils/admin';

// Initiate function ----------------------------------------------------------
const functionBuilder = functions.region('asia-east2').https;
const api: express.Application = express();
api.use(cors({origin: true}));
api.use(auth);

// Get all management group ---------------------------------------------------
api.get('/', async (request:functions.Request, response: functions.Response) => {
  const snapshot = await db.collection('management-groups').get();
  const data = snapshot.docs.map((doc) => {
    const id = doc.id;
    const data = doc.data();
    return {id: id, ...data};
  });
  return response.status(200).json(data);
});

// Export ---------------------------------------------------------------------
const managementGroup = functionBuilder.onRequest(api);
export default managementGroup;
