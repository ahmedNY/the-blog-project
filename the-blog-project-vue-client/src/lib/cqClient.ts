import axios from 'axios';

const baseUrl = '/api';
export const cqClient = {
  async command<T>(command: any, payload: any, extraHeaders?: Object) {
    const token = localStorage.getItem('token');
    const response = await axios.post<T>(
      baseUrl + '/commands/' + command,
      payload,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          ...extraHeaders
        }
      }
    );
    return response.data;
  },
  async query<T>(query: any) {
    const token = localStorage.getItem('token');
    const response = await axios.get<T>(baseUrl + '/queries/' + query, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  },
};
