import axiosClient from './axiosClient'

const postApi = {
    getAll: () => axiosClient.get('post/readPost.php'),
    getTopPost: () => axiosClient.get('post/ReadTopPost.php'),
    getAllByUser: (user_id) => axiosClient.get(`post/readPostByUser.php?user_id=${user_id}`),
    create: (params) => axiosClient.post('post/CreatePost.php', params),
    getOne: (id) => axiosClient.get(`post/showPost.php?id=${id}`),
    update: (params) => axiosClient.post('post/updatePost.php', params),
    delete: (id) => axiosClient.post(`post/deletePost.php?id=${id}`),
    getAllComments: (post_id) => axiosClient.get(`post/readComment.php?post_id=${post_id}`),
    createComment: (params) => axiosClient.post('post/createComment.php', params),
}

export default postApi