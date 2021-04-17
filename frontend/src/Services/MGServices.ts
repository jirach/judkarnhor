import { AxiosResponse } from 'axios';
import axios from './HttpService';
import { IManagementGroup } from '../type.d';

class MGService {
  static createManagementGroup = async (mg: IManagementGroup) => {
    const response: AxiosResponse = await axios.post(`${process.env.REACT_APP_API_URL}/managementGroup`, mg);
    return response.data;
  }

  static getAllManagementGroup = async () => {
    const response: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/managementGroup`);
    return response.data;
  }

  static updateManagementGroup = async (mg: IManagementGroup) => {
    const response: AxiosResponse = await axios.put(`${process.env.REACT_APP_API_URL}/managementGroup`, mg);
    return response.data;
  }

  static deleteManagementGroup = async (id: string) => {
    const response: AxiosResponse = await axios.delete(`${process.env.REACT_APP_API_URL}/managementGroup/${id}`);
    return response.data;
  }
}

export default MGService;
