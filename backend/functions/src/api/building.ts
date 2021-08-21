import * as functions from 'firebase-functions';
import {db} from '../utils/admin';

const getBuildingByManagementGroup = async (request:functions.Request, response: functions.Response) => {
  if (!request.params.id) {
    return response.status(400).json({message: 'Management Group required'});
  }

  console.log('db start');
  const query = await db.collection('buildings')
      .where('managementGroup.id', '==', request.params.id)
      .get();

  const data = query.docs;
  console.log('data', data);

  response.status(200).json({message: 'Hello from Jud-Karn-Hor APIs'});
  return response.status(200);
};

const createBuilding = async (request:functions.Request, response: functions.Response) =>{
  response.status(200).json({message: 'Hello from Jud-Karn-Hor APIs'});
  return response.status(200);
};

export {
  getBuildingByManagementGroup,
  createBuilding,
};
