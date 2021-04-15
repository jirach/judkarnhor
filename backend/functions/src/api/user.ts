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

// Create if not exist --------------------------------------------------------
api.post('/createIfNotExist', async (request: functions.Request, response: functions.Response) => {
  if (!request.body.id) {
    return response.status(404).json({message: 'User id required'});
  }

  // Check if user exist
  const snapshot = await db.collection('user').doc(request.body.id).get();
  const user = snapshot.data();
  if (user) return response.status(200).json({id: snapshot.id, ...user});

  // Create new user
  const newUser = {
    email: request.body.email,
    name: request.body.name,
    photoUrl: request.body.photoUrl,
  };
  db.collection('user').doc(request.body.id).set(newUser)
      .then(() => {
        return response.status(201).json(newUser);
      })
      .catch((error) => {
        console.log(error);
        return response.status(500).json({message: 'Error writing to database'});
      });
  return response.status(500).json({message: 'Error when creating user'});
});

// Get specific user id -------------------------------------------------------
api.get('/:id', async (request:functions.Request, response: functions.Response) => {
  const snapshot = await db.collection('user').doc(request.params.id).get();
  const user = snapshot.data();

  if (user) {
    return response.status(200).json(user);
  } else {
    return response.status(404).json({message: 'User not exist'});
  }
});

// Export ---------------------------------------------------------------------
const user = functionBuilder.onRequest(api);
export default user;
