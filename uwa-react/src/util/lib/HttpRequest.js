import axios from 'axios';
import Auth from 'util/lib/Authentication';

let instance;
class HttpRequest {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  get = ({
    url,
    params,
    timeout,
  }) => {
    console.log('get: ', url);
    const digestHeader = Auth.makeDigestHeader('GET', url);
    return axios.get(url, { ...digestHeader, params, timeout });
  }

  post = ({
    url,
    params,
    data,
    timeout,
  }) => {
    console.log('post: ', url);
    const digestHeader = Auth.makeDigestHeader('POST', url);
    return axios.post(url, data, { ...digestHeader, params, timeout });
  }

  put = ({
    url,
    params,
    data,
    timeout,
  }) => {
    console.log('put: ', url);
    const digestHeader = Auth.makeDigestHeader('PUT', url);
    return axios.put(url, data, { ...digestHeader, params, timeout });
  }
}

export default new HttpRequest();
