import * as functions from 'firebase-functions';
const config = functions.config().env;

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: 'jud-karn-hor.firebaseapp.com',
  projectId: 'jud-karn-hor',
  storageBucket: 'jud-karn-hor.appspot.com',
  messagingSenderId: '3055686063',
  appId: '1:3055686063:web:e6039ad30d7af991a85f5a',
  measurementId: 'G-GH5KE02305',
};

export default firebaseConfig;
