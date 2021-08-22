import * as functions from 'firebase-functions';
import {IRoom} from '../../../../shared/type';
import DataService from '../utils/data';

/**
 * Create room
 */
const createRoom = async (request:functions.Request, response: functions.Response) =>{
  // Validate input
  const room: IRoom = {
    buildingId: request.body.buildingId,
    floor: request.body.floor,
    roomNumber: request.body.roomNumber,
  };
  if (!room.buildingId) return response.status(400).json({message: 'Building ID required'});
  if (!room.floor) return response.status(400).json({message: 'Floor ID required'});
  if (!room.roomNumber) return response.status(400).json({message: 'Room number required'});

  // Check if room exist
  const exist = await DataService.isRoomExist(room);
  if (exist) return response.status(400).json({message: `Room ${room.roomNumber} already exist`});

  return response.status(200).json(await DataService.createRoom(room));
};

/**
 * Get room by building
 */
const getRoomByBuilding = async (request:functions.Request, response: functions.Response) =>{
  const building = request.params.id;
  if (!building) return response.status(400).json({message: 'Building ID required'});

  const rooms = await DataService.getRoomByBuilding(building);

  return response.status(200).json(rooms);
};

/**
 * Get room by building and floor
 */
const getRoomByBuildingAndFloor = async (request:functions.Request, response: functions.Response) =>{
  const building = request.params.id;
  const floor = +request.params.floor;
  if (!building) return response.status(400).json({message: 'Building ID required'});
  if (!floor) return response.status(400).json({message: 'Floor required'});

  const rooms = await DataService.getRoomByBuildingAndFloor(building, floor);

  return response.status(200).json(rooms);
};

/**
 * Update room
 */
const updateRoom = async (request:functions.Request, response: functions.Response) =>{
  // Validate input
  const room: IRoom = {
    id: request.body.id,
    buildingId: request.body.buildingId,
    floor: request.body.floor,
    roomNumber: request.body.roomNumber,
  };
  if (!room.id) return response.status(400).json({message: 'Room id required'});
  if (!room.buildingId) return response.status(400).json({message: 'Building id required'});
  if (!room.floor) return response.status(400).json({message: 'Floor required'});
  if (!room.roomNumber) return response.status(400).json({message: 'Room number required'});

  const updated = await DataService.updateRoom(room)
      .catch((error) => {
        response.status(500).json(error);
      });

  return response.status(200).json(updated);
};

/**
 * Delete room
 */
const deleteRoom = async (request:functions.Request, response: functions.Response) =>{
  // Validate input
  if (!request.params.building) return response.status(400).json({message: 'Building id required'});
  if (!request.params.id) return response.status(400).json({message: 'Room id required'});

  await DataService.deleteRoom(request.params.building, request.params.id)
      .catch((error) => {
        response.status(500).json(error);
      });

  return response.status(200).json({message: `Room ${request.params.id} deleted`});
};

export {
  createRoom,
  getRoomByBuilding,
  getRoomByBuildingAndFloor,
  updateRoom,
  deleteRoom,
};
