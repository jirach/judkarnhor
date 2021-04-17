import { AxiosResponse } from 'axios';
import axios from './HttpService';
import { IHTTPResponse, IManagementGroup } from '../type.d';

class MGService {
  static createManagementGroup = async (mg: IManagementGroup): Promise<IHTTPResponse> => {
    const res = <IHTTPResponse>{};
    try {
      const api: AxiosResponse = await axios.post(`${process.env.REACT_APP_API_URL}/managementGroup`, mg);
      res.status = api.status;
      res.data = api.data;
    } catch (error) {
      res.status = error.request.status;
      res.data = error.response.data.message;
      throw (res);
    }
    return res;
  }

  static getAllManagementGroup = async (): Promise<IHTTPResponse> => {
    const res = <IHTTPResponse>{};
    try {
      const api: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/managementGroup`);
      res.status = api.status;
      res.data = api.data;
    } catch (error) {
      res.status = error.request.status;
      res.data = error.response.data.message;
      throw (res);
    }
    return res;
  }

  static updateManagementGroup = async (mg: IManagementGroup): Promise<IHTTPResponse> => {
    const res = <IHTTPResponse>{};
    try {
      const api: AxiosResponse = await axios.put(`${process.env.REACT_APP_API_URL}/managementGroup`, mg);
      res.status = api.status;
      res.data = api.data;
    } catch (error) {
      res.status = error.request.status;
      res.data = error.response.data.message;
      throw (res);
    }
    return res;
  }

  static deleteManagementGroup = async (id: string): Promise<IHTTPResponse> => {
    const res = <IHTTPResponse>{};
    try {
      const api: AxiosResponse = await axios.delete(`${process.env.REACT_APP_API_URL}/managementGroup/${id}`);
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

export default MGService;
