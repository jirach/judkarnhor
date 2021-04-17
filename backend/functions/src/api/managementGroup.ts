import * as functions from 'firebase-functions';
import {db} from '../utils/admin';

const getAllManagementGroup = async (request:functions.Request, response: functions.Response) => {
  const snapshot = await db.collection('management-groups').get();
  const data = snapshot.docs.map((doc) => {
    const id = doc.id;
    const data = doc.data();
    return {id: id, ...data};
  });
  return response.status(200).json(data);
};

const createManagementGroup = async (request:functions.Request, response: functions.Response) => {
  if (!request.body.name) {
    return response.status(400).json({message: 'Management group name required'});
  }

  // Check if management group exist
  const snapshot = await db.collection('management-groups')
      .where('name', '==', request.body.name)
      .limit(1)
      .get();
  if (snapshot.size > 0) return response.status(400).json({message: 'Management group already exist'});

  return db.collection('management-groups').add({
    name: request.body.name,
  })
      .then((docRef) => {
        response.status(200).json({id: docRef.id, name: request.body.name});
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({message: 'Error creating management group'});
      });
};

const changeManagementGroup = async (request:functions.Request, response: functions.Response) => {
  if (!request.body.id || !request.body.name ) {
    return response.status(400).json({message: 'Management group id & name required'});
  }

  const ref = db.collection('management-groups').doc(request.body.id);

  return ref.update({
    name: request.body.name,
  })
      .then(() => {
        response.status(200).json({id: request.body.id, name: request.body.name});
      })
      .catch((error) => {
        console.error('Error changeManagementGroup: ', error);
        response.status(500).json({message: 'Error updating management group'});
      });
};

const deleteManagementGroup = async (request:functions.Request, response: functions.Response) => {
  if (!request.params.id ) {
    return response.status(400).json({message: 'Management group id required'});
  }

  const ref = db.collection('management-groups').doc(request.params.id);

  return ref.delete()
      .then(() => {
        response.status(200).json({message: `${request.params.id} deleted`});
      })
      .catch((error) => {
        console.error('Error deleteManagementGroup: ', error);
        response.status(500).json({message: 'Error deleting management group'});
      });
};

// Export ---------------------------------------------------------------------
export {getAllManagementGroup, createManagementGroup, changeManagementGroup, deleteManagementGroup};
