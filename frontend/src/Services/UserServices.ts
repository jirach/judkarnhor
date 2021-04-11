import firebase from 'firebase';
import { IUser } from '../type.d';

class UserService {
  static transformFirebaseUser = (firebaseUser: firebase.User): IUser => {
    const user: IUser = {
      userid: firebaseUser.uid,
      name: firebaseUser.displayName as string,
      email: firebaseUser.email as string,
      photoUrl: firebaseUser.photoURL as string,
      isLoaded: true,
    };
    return user;
  }
}

export default UserService;
