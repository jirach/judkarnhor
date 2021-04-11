export interface IUser {
    userid: string,
    name: string,
    email: string,
    photoUrl: string,
}

export type AuthContextProp = {
    handleSignin: {},
    handleSignout: {},
    user: {},
    errors: {},
  };
