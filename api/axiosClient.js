import axios from 'axios';
import utils from '../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingContext } from '../LoadingContext';
import { useContext } from 'react';

const baseURL = 'https://192.168.1.3:8443/api/v1/';

// const { showLoading, hideLoading } = useContext(LoadingContext);

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
    // showLoading();

    return config;
  },
  (error) => {
    // hideLoading();
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // Ẩn spinner overlay khi nhận được response
    // hideLoading();

    return response;
  },
  (error) => {
    // Ẩn spinner overlay nếu xảy ra lỗi
    // hideLoading();

    return Promise.reject(error);
  }
);

export default axiosClient;