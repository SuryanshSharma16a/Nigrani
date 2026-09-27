import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem('nigraniUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error("Error parsing user data");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getInstitutions = async () => {
  const response = await api.get('/institutions');
  return response.data;
};

export const getInspections = async () => {
  const response = await api.get('/inspections');
  return response.data;
};

export const submitInspection = async (data) => {
  const response = await api.post('/inspections', data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export default api;
