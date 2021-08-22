import * as functions from 'firebase-functions';
import {IBuilding} from '../../../../shared/type';
import DataService from '../utils/data';

/**
 * Get buildings by management group
 */
const getBuildingByManagementGroup = async (request:functions.Request, response: functions.Response) => {
  if (!request.params.id) {
    response.status(400).json({message: 'Management Group required'});
  }
  const buildings = await DataService.getBuildingByManagementGroup(request.params.id);
  response.status(200).json(buildings);
};

/**
 * Create building
 */
const createBuilding = async (request:functions.Request, response: functions.Response) =>{
  // Validate input
  const buildingToCreate: IBuilding = {
    name: request.body.name,
    managementGroup: request.body.managementGroup,
    imageUrl: request.body.imageUrl ? request.body.imageUrl : '',
  };
  if (!buildingToCreate.name) return response.status(400).json({message: 'Building name required'});
  if (!buildingToCreate.managementGroup.id) return response.status(400).json({message: 'Building name required'});

  // Check if building exist with the same name
  const exist = await DataService.isBuildingNameExist(buildingToCreate.managementGroup.id as string, buildingToCreate.name);
  if (exist) return response.status(400).json({message: 'Building ' + buildingToCreate.name + ' already exist'});

  return response.status(200).json(await DataService.createBuilding(buildingToCreate));
};

/**
 * Update building
 */
const updateBuilding = async (request:functions.Request, response: functions.Response) =>{
  // Validate input
  const update: IBuilding = {
    id: request.body.id,
    name: request.body.name,
    managementGroup: request.body.managementGroup,
    imageUrl: request.body.imageUrl ? request.body.imageUrl : '',
  };
  if (!update.id) return response.status(400).json({message: 'Building id required'});

  // Check if building exist with the same name
  const exist = await DataService.isBuildingNameExist(update.managementGroup.id as string, update.name);
  if (exist) return response.status(400).json({message: 'Building ' + update.name + ' already exist'});

  return response.status(200).json(await DataService.updateBuilding(update));
};

/**
 * Delete building
 */
const deleteBuilding = async (request:functions.Request, response: functions.Response) =>{
  // Validate input
  if (!request.params.id) return response.status(400).json({message: 'Building id required'});

  // Check if building exist
  const exist = await DataService.isBuildingIdExist(request.params.id);
  if (!exist) return response.status(400).json({message: 'Building ' + request.params.id + ' not exist'});

  const deleted = await DataService.deleteBuilding(request.params.id);

  if (deleted) {
    return response.status(200).json({message: `Building ${request.params.id} deleted`});
  } else {
    return response.status(400).json({message: `Error deleting building ${request.params.id}`});
  }
};

export {
  getBuildingByManagementGroup,
  createBuilding,
  updateBuilding,
  deleteBuilding,
};
