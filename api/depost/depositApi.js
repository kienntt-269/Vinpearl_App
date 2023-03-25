import axiosClient from '../axiosClient'

const productDepositApi = {
    getAll: () => axiosClient.get('readProduct.php'),
    create: (params) => axiosClient.post('createProduct.php', params),
    getOneCar: (id) => axiosClient.get(`deposit/read_${id}.php`),
    getByName: (name) => axiosClient.get(`deposit/readCarByName.php?name=${name}`),
    update: (id, params) => axiosClient.put(`readProduct.php/${id}`, params),
    getAllCarContainer: () => axiosClient.get('deposit/readDepositContainer.php'),
    getAllCarDeposit: () => axiosClient.get('deposit/readAll.php'),
}

export default productDepositApi