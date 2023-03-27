import axiosClient from './axiosClient'
import axios from 'axios'

const accountApi = {
    login: (params) => axios.post(`http://192.168.1.6:8080/api/v1/customer/login`, params),
    // login: (data) => axiosClient.post(`customer/login`, data),
    register: (params) => axios.post(`http://192.168.1.6:8080/api/v1/customer/register`, params),
    update: (params) => axiosClient.post(`customer/update`, params),
}

export default accountApi