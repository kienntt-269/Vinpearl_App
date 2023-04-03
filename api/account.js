import axiosClient from './axiosClient'
import axios from 'axios'
import domain from './domain'

const accountApi = {
    login: (params) => axios.post(`${domain}/customer/login`, params),
    // login: (data) => axiosClient.post(`customer/login`, data),
    register: (params) => axios.post(`${domain}/customer/register`, params),
    register: (params) => axios.post(`${domain}/customer/register`, params),
    detail: (id) => axios.post(`${domain}/customer/detail/${id}`),
    update: (id, params) => axios.post(`${domain}/customer/update/${id}`, params),
}

export default accountApi