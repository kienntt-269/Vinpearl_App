import axiosClient from '../axiosClient'
import axios from 'axios'
import domain from '../domain'

const homeApi = {

    // home
    searchPost: (params) => axios.get(`${domain}/post/search`, {params: params}),
    searchHotel: () => axios.get(`${domain}/hotel/search/customer`),
    getAllSite: () => axios.get(`${domain}/site/findAll`),
    getHotelDetail: () => axios.get(`${domain}/hotel/detail`),
    
    // tour
    searchTour: (params) => axios.get(`${domain}/tour/search`, {params: params}),
    getTourDetail: (id) => axios.get(`${domain}/tour/detail/${id}`),
    
    // booking room, tour
    getBookingRoom: () => axios.get(`${domain}/booking-room/booking`),
    getBookingTour: () => axios.get(`${domain}/booking-tour/booking`),
    checkBookingRoomOK: () => axios.get(`${domain}/booking-room/check-payment-room-ok`),
    searchBookingRoom: () => axios.get(`${domain}/booking-room/search`),
    searchBookingTour: () => axios.get(`${domain}/booking-tour/search`),
    getDetailBookingRoom: () => axios.get(`${domain}/booking-room/detail`),
    getDetailBookingTour: () => axios.get(`${domain}/booking-tour/detail`),
    getBookingRoomByPaymentCode: () => axios.get(`${domain}/booking-room/findByPaymentCode`),
}

export default homeApi