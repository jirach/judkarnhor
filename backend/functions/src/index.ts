import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import auth from './utils/auth';
import * as user from './api/user';
import * as mg from './api/managementGroup';
import * as healthz from './api/healthz';
import * as building from './api/building';
import * as room from './api/room';

// Initiate function ----------------------------------------------------------
const functionBuilder = functions.region('asia-east2').https;
const api: express.Application = express();
api.use(cors({origin: true}));
api.use(auth);

// Health Check ---------------------------------------------------------------
api.get('/healthz', healthz.echoHealthz);

// User APIs ------------------------------------------------------------------
api.get('/user/:id', user.getUserById);
api.post('/user/createIfNotExist', user.createIfNotExist);
api.post('/user/:id/managementGroup', user.setManagementGroup);

// Management Group APIs ------------------------------------------------------
api.get('/managementGroup', mg.getAllManagementGroup);
api.post('/managementGroup', mg.createManagementGroup);
api.put('/managementGroup', mg.updateManagementGroup);
api.delete('/managementGroup/:id', mg.deleteManagementGroup);

// Building -------------------------------------------------------------------
api.get('/building/:id', building.getBuildingByManagementGroup);
api.post('/building', building.createBuilding);
api.put('/building', building.updateBuilding);
api.delete('/building/:id', building.deleteBuilding);

// Room -----------------------------------------------------------------------
api.get('/room/:id', room.getRoomByBuilding);
api.get('/room/:id/:floor', room.getRoomByBuildingAndFloor);
api.post('/room', room.createRoom);
api.put('/room', room.updateRoom);
api.delete('/room/:building/:id', room.deleteRoom);

// APIs
exports.api = functionBuilder.onRequest(api);
