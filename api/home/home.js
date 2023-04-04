import axiosClient from '../axiosClient'

const homeApi = {

    // home
    searchPost: (params) => axiosClient.get(`post/search`, {params: params}),
    searchRoomType: (params) => axiosClient.get(`room/room-type/search`, {params: params}),
    searchHotel: (params) => axiosClient.get(`hotel/search/customer`, {params: params}),
    getAllSite: () => axiosClient.get(`site/findAll`),
    getHotelDetail: () => axiosClient.get(`hotel/detail`),
    
    // tour
    searchTour: (params) => axiosClient.get(`tour/search`, {params: params}),
    getTourDetail: (id) => axiosClient.get(`tour/detail/${id}`),
    
    // booking room, tour

    // addBookingRoom: (data) => axiosClient.post(`payment`, data),
    addBookingRoom: (data) => axiosClient.post(`booking-room/booking`, data),
    addBookingTour: (data) => axiosClient.post(`booking-tour/booking`, data),

    getBookingRoom: () => axiosClient.get(`booking-room/booking`),
    getBookingTour: () => axiosClient.get(`booking-tour/booking`),
    checkBookingRoomOK: () => axiosClient.get(`booking-room/check-payment-room-ok`),
    searchBookingRoom: (params) => axiosClient.get(`booking-room/search`, {params: params}),
    searchBookingTour: (params) => axiosClient.get(`booking-tour/search`, {params: params}),
    getDetailBookingRoom: () => axiosClient.get(`booking-room/detail`),
    getDetailBookingTour: () => axiosClient.get(`booking-tour/detail`),
    getBookingRoomByPaymentCode: () => axiosClient.get(`booking-room/findByPaymentCode`),
}

export default homeApi