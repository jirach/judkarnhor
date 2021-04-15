/* eslint-disable @typescript-eslint/no-explicit-any */
import {admin} from './admin';

const auth = (request: any, response: any, next:any) => {
  let idToken;

  // Check bearer token
  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
    idToken = request.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return response.status(403).json({error: 'Unauthorized'});
  }

  // Validate token
  admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        request.user = decodedToken;
        return next();
      })
      .catch((err) => {
        console.error('Error while verifying token', err);
        return response.status(403).json(err);
      });
};

export default auth;
