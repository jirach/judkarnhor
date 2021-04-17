import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import auth from './utils/auth';
import * as user from './api/user';
import * as mg from './api/managementGroup';
import * as healthz from './api/healthz';

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
api.put('/managementGroup', mg.changeManagementGroup);
api.delete('/managementGroup/:id', mg.deleteManagementGroup);

// APIs
exports.api = functionBuilder.onRequest(api);
