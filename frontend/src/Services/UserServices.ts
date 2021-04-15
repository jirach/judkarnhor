import axios from './HttpService';
import { IUser } from '../type.d';

class UserService {
  static transformFirebaseUser = (firebaseUser: any): IUser => {
    const user: IUser = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName as string,
      email: firebaseUser.email as string,
      photoUrl: firebaseUser.photoURL as string,
      isLoaded: true,
      token: firebaseUser.za,
    };
    // Save token in local storage
    localStorage.setItem('token', user.token);

    // TODO remove
    console.log(user.token);
    return user;
  }

  static setToken = (user: IUser, token: string): IUser => {
    const newUser = user;
    newUser.token = token;
    return newUser;
  }

  static createIfNotExist = (user: IUser) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/createIfNotExist`, user)
      .then((response) => response.data)
      .catch((error) => {
        console.log('error', error);
      });
  }
}

export default UserService;
