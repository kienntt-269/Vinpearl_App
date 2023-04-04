import axios from 'axios';
import utils from '../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.1.6:8080/api/v1/';

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(utils.CONSTANTS.TOKEN);
    if (token && config.url !== 'login' && config.url !== 'register' && config.url !== 'images') {
      // Nếu có token và request không phải là đăng nhập hoặc đăng ký thì truyền token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;