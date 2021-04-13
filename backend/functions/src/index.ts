import * as functions from 'firebase-functions';
import {healthz} from './api/healthz';

// Initiate function
const functionBuilder = functions.region('asia-east2').https;

// API
exports.hello = functionBuilder.onRequest(healthz);
