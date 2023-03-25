import axiosClient from '../axiosClient'
import axios from 'axios'

const customerApi = {
    getAll: () => axiosClient.get('deposit/customer/readCustomer.php'),
    getTopCustomer: () => axiosClient.get('deposit/customer/readTopCustomer.php'),
    create: (params) => axiosClient.post('deposit/customer/createCustomer.php', params),
    postVNPay: (params) => axiosClient.post('deposit/vnpay_php/vnpay_create_payment.php', params),
    createVNPay: (params) => axiosClient.post('deposit/customer/createCustomerVNpay.php', params),
    getByEmail: (email) => axiosClient.get(`deposit/customer/readCustomerByEmail.php?email=${email}`),
    getBySell: (sell) => axiosClient.get(`deposit/customer/readCustomerBySell.php?created_by=${sell}`),
    update: (params) => axiosClient.post(`deposit/customer/updateCustomer.php`, params),
    
    getOne: (id) => axios.get(`http://192.168.234.1/vinfast-backend/api/deposit/customer/showCustomer.php?id=${id}`),
}

export default customerApi