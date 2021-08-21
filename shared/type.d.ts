export interface IUser {
    id: string,
    name: string,
    email: string,
    photoUrl: string,
    managementGroup?: IManagementGroup,
    isAdmin: boolean,
    isLoaded: boolean,
    isAuthenticated: boolean,
    token: string,
}

export interface IManagementGroup {
    id?: string,
    name: string,
}

export interface IHTTPResponse {
    status: number,
    data: any,
}

export type AuthContextProp = {
    handleSignin: {},
    handleSignout: {},
    user: {},
    errors: {},
  };
