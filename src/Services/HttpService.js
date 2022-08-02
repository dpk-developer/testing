import { AsyncStrings } from '../Constants';
import { getStorage } from '../Helpers/Storage';
import ApiEndPoints from '../Constants/ApiEndPoints';

const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  Authorization: '',
};

getStorage(AsyncStrings.USER_ACCESS_TOKEN)
  .then((accessToken) => (headers.Authorization = accessToken))
  .catch((error) =>
    console.error(`error with ${AsyncStrings.USER_ACCESS_TOKEN}`, error),
  );

const joinURL = (baseURL, url) => {
  return `${baseURL}/${url}`;
};
class HttpService {
  constructor() {
    this.domain = ApiEndPoints.BASE_URL;
  }

  request(url, method = 'POST', data = null) {
    url = joinURL(this.domain, url);

    const options = {
      headers,
      method,
    };

    options.headers.Authorization = data?.authorization ?? '';

    if (data) {
      options.body = JSON.stringify({ ...data });
    }

    return fetch(url, options);
  }

  async get(url, id) {
    const method = 'GET';
    if (id) {
      url = `${url}/${id}`;
    }
    return await this.request(url, method).then((response) => response.json());
  }

  async post(url, data) {
    const method = 'POST';
    return await this.request(url, method, data).then((response) =>
      response.json(),
    );
  }

  async put(url, data) {
    const method = 'PUT';
    return await this.request(url, method, data).then((response) =>
      response.json(),
    );
  }

  async delete(url, id) {
    const method = 'DELETE';
    if (id) {
      url = `${url}/${id}`;
    }
    return await this.request(url, method).then((response) => response.json());
  }
}

export default HttpService;
