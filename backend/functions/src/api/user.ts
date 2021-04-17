import * as functions from 'firebase-functions';
import {db} from '../utils/admin';

// Create if not exist --------------------------------------------------------
const createIfNotExist = async (request: functions.Request, response: functions.Response) => {
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

  return db.collection('user').doc(request.body.id).set(newUser)
      .then(() => {
        response.status(201).json(newUser);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({message: 'Error writing to database'});
      });
};

// Get specific user id -------------------------------------------------------
const getUserById = async (request:functions.Request, response: functions.Response) => {
  if (!request.params.id) {
    return response.status(400).json({message: 'User id required'});
  }

  const snapshot = await db.collection('user').doc(request.params.id).get();
  const user = snapshot.data();

  if (user) {
    return response.status(200).json(user);
  } else {
    return response.status(404).json({message: 'User not exist'});
  }
};

// Add Management Group -------------------------------------------------------
const setManagementGroup = async (request:functions.Request, response: functions.Response) => {
  if (!request.params.id || !request.body.mgId || !request.body.mgName ) {
    return response.status(400).json({message: 'User id, Management Group ID, and Management Group Name required'});
  }

  const mg = {
    id: request.body.mgId,
    name: request.body.mgName,
  };

  return db.collection('user').doc(request.params.id).update({managementGroup: mg})
      .then(() => {
        response.status(201).json(mg);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({message: 'Error updating user management group'});
      });
};

// Export ---------------------------------------------------------------------
export {
  createIfNotExist,
  getUserById,
  setManagementGroup,
};
