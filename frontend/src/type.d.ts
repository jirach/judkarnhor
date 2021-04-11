export interface IUser {
    userid: string,
    name: string,
    email: string,
    photoUrl: string,
    isLoaded: boolean,
}

export type AuthContextProp = {
    handleSignin: {},
    handleSignout: {},
    user: {},
    errors: {},
  };
