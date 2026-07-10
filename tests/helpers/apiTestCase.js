const { TestResponse } = require('./testResponse');

function createApiTestCase(server) {
  let defaultHeaders = {};

  async function request(method, uri, data = {}, headers = {}) {
    const url = server.baseUrl + uri;
    const requestHeaders = { ...defaultHeaders, ...headers };

    const init = { method, headers: requestHeaders, redirect: 'manual' };

    if (Object.keys(data).length > 0) {
      if ((requestHeaders['Content-Type'] || '') === 'application/json') {
        init.body = JSON.stringify(data);
      } else {
        init.body = new URLSearchParams(data).toString();
        requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
        init.headers = requestHeaders;
      }
    }

    const response = await fetch(url, init);
    const text = await response.text();

    let body = null;
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = null;
      }
    }

    return new TestResponse(response.status, response.headers, body, text, api);
  }

  const api = {
    request,
    get: (uri, headers = {}) => request('GET', uri, {}, headers),
    post: (uri, data = {}, headers = {}) => request('POST', uri, data, headers),
    postJson: (uri, data = {}, headers = {}) => {
      headers['Content-Type'] = 'application/json';
      return request('POST', uri, data, headers);
    },
    getJson: (uri, headers = {}) => {
      headers.Accept = 'application/json';
      return request('GET', uri, {}, headers);
    },
    deleteJson: (uri, headers = {}) => request('DELETE', uri, {}, headers),
    withHeaders(headers) {
      defaultHeaders = headers;
      return api;
    },
    bearerHeaders(token) {
      return { Authorization: `Bearer ${token}` };
    },
    async createAuthenticatedToken() {
      await api.postJson('/auth/register', {
        email: 'test@example.com',
        password: 'secret123',
      }).then((r) => r.assertCreated());

      const response = await api.post('/auth/login', {
        username: 'test@example.com',
        password: 'secret123',
      });
      response.assertOk();
      return response.json().access_token;
    },
    resetHeaders() {
      defaultHeaders = {};
    },
  };

  return api;
}

module.exports = { createApiTestCase };
