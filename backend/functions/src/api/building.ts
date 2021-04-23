import * as functions from 'firebase-functions';

const createBuilding = async (request:functions.Request, response: functions.Response) =>{
  response.status(200).json({message: 'Hello from Jud-Karn-Hor APIs'});
};

export {createBuilding};
