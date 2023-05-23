import axiosClient from '../axiosClient'

const homeApi = {

    // home
    searchPost: (params) => axiosClient.get(`post/search`, {params: params}),
    postDetail: (id) => axiosClient.get(`post/detail/${id}`),
    searchRoomType: (params) => axiosClient.get(`room/room-type/search`, {params: params}),
    searchHotel: (params) => axiosClient.get(`hotel/search/customer`, {params: params}),
    getAllSite: () => axiosClient.get(`site/findAll`),
    getHotelDetail: () => axiosClient.get(`hotel/detail`),
    getTourRecommendation: (id) => axiosClient.get(`tour/recommendation/${id}`),
    
    //comments
    searchComment: (postId, params) => axiosClient.get(`posts/${postId}/comments/search`, {params: params}),
    addComment: (postId, data) => axiosClient.post(`posts/${postId}/comments/create`, data),
    updateComment: (postId, id, data) => axiosClient.put(`posts/${postId}/comments/update/${id}`, data),
    deleteComment: (postId, id) => axiosClient.get(`posts/${postId}/comments/delete/${id}`),
    
    // tour
    searchTour: (params) => axiosClient.get(`tour/search`, {params: params}),
    getTourDetail: (id) => axiosClient.get(`tour/detail/${id}`),
    
    // booking room, tour

    // addBookingRoom: (data) => axiosClient.post(`payment`, data),
    addBookingRoom: (data) => axiosClient.post(`booking-room/booking`, data),
    addBookingTour: (data) => axiosClient.post(`booking-tour/booking`, data),
    getBookingRoomByPaymentCode: (code) => axiosClient.get(`booking-room/findByPaymentCode/${code}`),
    getBookingTourByPaymentCode: (code) => axiosClient.get(`booking-tour/findByPaymentCode/${code}`),
    checkBookingRoomOK: (code, id) => axiosClient.put(`booking-room/check-payment-room-ok/${code}`, id),
    checkBookingTourOK: (code, id) => axiosClient.put(`booking-tour/check-payment-tour-ok/${code}`, id),

    getBookingRoom: () => axiosClient.get(`booking-room/booking`),
    getBookingTour: () => axiosClient.get(`booking-tour/booking`),
    searchBookingRoom: (params) => axiosClient.get(`booking-room/search`, {params: params}),
    searchBookingTour: (params) => axiosClient.get(`booking-tour/search`, {params: params}),
    getDetailBookingRoom: (id) => axiosClient.get(`booking-room/detail/${id}`),
    getDetailBookingTour: (id) => axiosClient.get(`booking-tour/detail/${id}`),
}

export default homeApi