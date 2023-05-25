import axiosClient from './axiosClient'
import axios from 'axios'
import domain from './domain'

const accountApi = {
    login: (data) => axiosClient.post(`public/customer/login`, data),
    register: (data) => axiosClient.post(`public/customer/register`, data),
    detail: (id) => axiosClient.get(`customer/detail/${id}`),
    update: (id, data) => axiosClient.put(`customer/update/${id}`, data),
}

export default accountApi