import { AxiosResponse } from 'axios';
import axios from './HttpService';
import { IHTTPResponse, IManagementGroup, IUser } from '../../../shared/type.d';

class UserService {
  static transformFirebaseUser = (firebaseUser: any): IUser => {
    const user: IUser = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName as string,
      email: firebaseUser.email as string,
      photoUrl: firebaseUser.photoURL as string,
      isAdmin: false,
      isAuthenticated: true,
      isLoaded: false,
      token: firebaseUser.za,
    };
    // Save token in local storage
    localStorage.setItem('token', user.token);

    console.log(user.token);
    return user;
  }

  static setToken = (user: IUser, token: string): IUser => {
    const newUser = user;
    newUser.token = token;
    return newUser;
  }

  static createIfNotExist = async (user: IUser) => {
    const res = <IHTTPResponse>{};
    try {
      const userToCreate = user;
      userToCreate.photoUrl = user.photoUrl ? user.photoUrl.replace('s96-c', 's400-c') : '';

      const api: AxiosResponse = await axios.post(`${process.env.REACT_APP_API_URL}/user/createIfNotExist`, userToCreate);
      res.status = api.status;
      res.data = api.data;
    } catch (error) {
      res.status = error.request.status;
      res.data = error.response.data.message;
      throw (res);
    }
    return res;
  }

  static updateManagementGroup = async (userId: string, mg: IManagementGroup) => {
    const res = <IHTTPResponse>{};
    try {
      const api: AxiosResponse = await axios
        .post(`${process.env.REACT_APP_API_URL}/user/${userId}/managementGroup`,
          {
            mgId: mg.id,
            mgName: mg.name,
          });
      res.status = api.status;
      res.data = api.data;
    } catch (error) {
      res.status = error.request.status;
      res.data = error.response.data.message;
      throw (res);
    }
    return res;
  }
}

export default UserService;
