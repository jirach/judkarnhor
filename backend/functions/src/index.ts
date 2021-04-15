import * as functions from 'firebase-functions';
import healthz from './api/healthz';
import user from './api/user';
import managementGroup from './api/managementGroup';

// Initiate function
const functionBuilder = functions.region('asia-east2').https;

// APIs
exports.hello = functionBuilder.onRequest(healthz);
exports.user = functionBuilder.onRequest(user);
exports.managementGroup = functionBuilder.onRequest(managementGroup);
