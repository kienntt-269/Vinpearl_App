import axios from 'axios';
import utils from '../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showSpinner, hideSpinner } from '../redux/spinner/spinnerSlice';
import store from '../redux/store';
import domain from './domain';

const baseURL = `${domain}/api/v1/`;

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

    // Hiển thị spinner overlay
    store.dispatch(showSpinner(true));

    return config;
  },
  (error) => {
    store.dispatch(hideSpinner(false));
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // Ẩn spinner overlay khi nhận được response
    store.dispatch(hideSpinner(false));

    return response;
  },
  (error) => {
    // Ẩn spinner overlay nếu xảy ra lỗi
    store.dispatch(hideSpinner(false));

    return Promise.reject(error);
  }
);

export default axiosClient;
