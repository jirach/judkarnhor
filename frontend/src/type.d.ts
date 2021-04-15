export interface IUser {
    id: string,
    name: string,
    email: string,
    photoUrl: string,
    isAdmin: boolean,
    isLoaded: boolean,
    isAuthenticated: boolean,
    token: string,
}

export type AuthContextProp = {
    handleSignin: {},
    handleSignout: {},
    user: {},
    errors: {},
  };
