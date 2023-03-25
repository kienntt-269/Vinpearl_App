import axiosClient from '../axiosClient'

const productApi = {
    getAll: () => axiosClient.get('admin/readProducts.php'),
    create: (params) => axiosClient.post('admin/createProduct.php', params),
    getOne: (id) => axiosClient.get(`admin/showProduct.php?id=${id}`),
    update: (params) => axiosClient.post("admin/updateProduct.php", params),
    delete: (id) => axiosClient.post(`admin/deleteProduct.php?id=${id}`),

    getAllBanner: () => axiosClient.get('home/readBanner.php'),
    createBanner: (params) => axiosClient.post('home/createBanner.php', params),
    getOneBanner: (id) => axiosClient.get(`home/showBanner.php?id=${id}`),
    updateBanner: (params) => axiosClient.post("home/updateBanner.php", params),
    deleteBanner: (id) => axiosClient.post(`home/deleteBanner.php?id=${id}`), 

    getAllBlock1: () => axiosClient.get('home/readBlock1.php'),
    createBlock1: (params) => axiosClient.post('home/createBlock1.php', params),
    getOneBlock1: (id) => axiosClient.get(`home/showBlock1.php?id=${id}`),
    updateBlock1: (params) => axiosClient.post("home/updateBlock1.php", params),
    deleteBlock1: (id) => axiosClient.post(`home/deleteBlock1.php?id=${id}`), 

    getAllBlock2: () => axiosClient.get('home/readBlock2.php'),
    createBlock2: (params) => axiosClient.post('home/createBlock2.php', params),
    getOneBlock2: (id) => axiosClient.get(`home/showBlock2.php?id=${id}`),
    updateBlock2: (params) => axiosClient.post("home/updateBlock2.php", params),
    deleteBlock2: (id) => axiosClient.post(`home/deleteBlock2.php?id=${id}`), 

    getAllBlock3: () => axiosClient.get('home/readBlock3.php'),
    createBlock3: (params) => axiosClient.post('home/createBlock3.php', params),
    getOneBlock3: (id_xe) => axiosClient.get(`home/showBlock3.php?id_xe=${id_xe}`),
    updateBlock3: (params) => axiosClient.post("home/updateBlock3.php", params),
    deleteBlock3: (id_xe) => axiosClient.post(`home/deleteBlock3.php?id_xe=${id_xe}`), 

    getAllBlock4: () => axiosClient.get('home/readBlock4.php'),
    createBlock4: (params) => axiosClient.post('home/createBlock4.php', params),
    getOneBlock4: (id_xe) => axiosClient.get(`home/showBlock4.php?id_xe=${id_xe}`),
    updateBlock4: (params) => axiosClient.post("home/updateBlock4.php", params),
    deleteBlock4: (id_xe) => axiosClient.post(`home/deleteBlock4.php?id_xe=${id_xe}`),
}

export default productApi