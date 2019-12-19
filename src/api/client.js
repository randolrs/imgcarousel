import axios from 'axios';
import qs from 'qs';

class ApiClient {
  constructor (options = {}) {
    this.api = axios.create({
      baseURL: options.apiUrl,
      timeout: 61000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  fetch = (url, params) => {

    // handle errors
    // imporve this
    return this.api.get(url + '?client_id=735383e17276cf0667bf1d7c0755d0e19d38ff8989e939454a0ac984c7afefea').then(res => { //assume params as string first
      return res.data;
    });
  }

  fetchAll = (url, params) => {

    // handle errors
    // imporve this url
    return this.api.get(url + '&client_id=735383e17276cf0667bf1d7c0755d0e19d38ff8989e939454a0ac984c7afefea').then(res => { //assume params as string first
      const {
        results,
        total,
        total_pages
      } = res.data;

      const result = {
        data: results,
        meta: {
          total,
        }
      };

      return result;
    });
  }

  buildQueryString(params) {
    const result = qs.stringify(params, { arrayFormat: 'brackets', encodeValuesOnly: true });

    return result ? `?${result}` : '';
  }
}

const apiUrl = 'https://api.unsplash.com/';

const apiClient = new ApiClient({
  apiUrl: apiUrl,
});

export default apiClient;
