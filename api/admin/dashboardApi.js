import axiosClient from '../axiosClient'

const dashboardApi = {
    getCustomerAll: (from, to, sell) => axiosClient.get(`admin/fromDayToDay.php?from=${from}&to=${to}&sell=${sell}`),
    getAccountAll: (from, to) => axiosClient.get(`admin/fromDayToDayAccount.php?from=${from}&to=${to}`),
}

export default dashboardApi