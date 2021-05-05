export class Service {
  _apiBase = 'https://rn-todo-app-20375-default-rtdb.firebaseio.com';

  get = async () => {
    try {
      return await request(`${this._apiBase}/todos.json`);
    } catch (e) {
      throw e;
    }
  };
  post = async (data = {}) => {
    try {
      return await request(`${this._apiBase}/todos.json`, 'POST', data);
    } catch (e) {
      throw e;
    }
  };
  delete = async (id) => {
    try {
      return await request(`${this._apiBase}/todos/${id}.json`, 'DELETE');
    } catch (e) {
      throw e;
    }
  };

  patch = async (id, data = {}) => {
    try {
      return await request(`${this._apiBase}/todos/${id}.json`, 'PATCH', data);
    } catch (e) {
      throw e;
    }
  };
}

async function request(url, method = 'GET', data) {
  const dataConfig = {
    method,
    headers: { 'Content-type': 'application/json' },
  };
  if (method === 'POST' || method === 'PATCH') {
    dataConfig.body = JSON.stringify(data);
  }
  const response = await fetch(url, dataConfig);
  return response.json();
}

const service = new Service();
export default service;
