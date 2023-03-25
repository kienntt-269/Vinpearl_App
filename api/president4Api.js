import axiosClient from './axiosClient'

const president4Api = {
    getAll: () => axiosClient.get('readPresident4.php')
}

export default president4Api