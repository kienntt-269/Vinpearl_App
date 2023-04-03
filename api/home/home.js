import axiosClient from '../axiosClient'
import axios from 'axios'
import domain from '../domain'

const homeApi = {

    // home
    searchPost: (params) => axios.get(`${domain}/post/search`, {params: params}),
    searchRoomType: (params) => axios.get(`${domain}/room/room-type/search`, {params: params}),
    searchHotel: (params) => axios.get(`${domain}/hotel/search/customer`, {params: params}),
    getAllSite: () => axios.get(`${domain}/site/findAll`),
    getHotelDetail: () => axios.get(`${domain}/hotel/detail`),
    
    // tour
    searchTour: (params) => axios.get(`${domain}/tour/search`, {params: params}),
    getTourDetail: (id) => axios.get(`${domain}/tour/detail/${id}`),
    
    // booking room, tour

    addBookingRoom: (data) => axios.post(`${domain}/payment`, data),
    // addBookingRoom: (data) => axios.post(`${domain}/booking-room/booking`, data),
    // addBookingTour: (data) => axios.post(`${domain}/booking-tour/booking`, data),

    getBookingRoom: () => axios.get(`${domain}/booking-room/booking`),
    getBookingTour: () => axios.get(`${domain}/booking-tour/booking`),
    checkBookingRoomOK: () => axios.get(`${domain}/booking-room/check-payment-room-ok`),
    searchBookingRoom: (params) => axios.get(`${domain}/booking-room/search`, {params: params}),
    searchBookingTour: (params) => axios.get(`${domain}/booking-tour/search`, {params: params}),
    getDetailBookingRoom: () => axios.get(`${domain}/booking-room/detail`),
    getDetailBookingTour: () => axios.get(`${domain}/booking-tour/detail`),
    getBookingRoomByPaymentCode: () => axios.get(`${domain}/booking-room/findByPaymentCode`),
}

export default homeApi