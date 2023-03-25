import axiosClient from '../axiosClient'

const productClientApi = {
    getAll: () => axiosClient.get('readProduct.php'),
    create: (params) => axiosClient.post('createProduct.php', params),
    getOne: (id) => axiosClient.get(`readProduct.php/${id}`),
    update: (id, params) => axiosClient.put(`readProduct.php/${id}`, params),
    getCarBlock3: (params) => axiosClient.get(`deposit/read_${params}.php`),
    getCarByName: (name) => axiosClient.get(`deposit/readCarByName.php?name=${name}`),
}

export default productClientApi