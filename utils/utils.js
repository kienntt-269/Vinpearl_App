function getDay(miliDate) {
    const day = new Date(parseInt(miliDate)).getDay();
    let charDay;
    switch (day) {
      case 0:
        charDay = 'Một';
        break;
      case 1:
        charDay = "Hai";
        break;
      case 2:
        charDay = "Ba";
        break;
      case 3:
        charDay = "Tư";
        break;
      case 4:
        charDay = "Năm";
        break;
      case 5:
        charDay = "Sáu";
        break;
      case 6:
        charDay = "Bảy";
        break;
      default:
        charDay = "Chủ nhật";
        break;
    }
    if (charDay == "Chủ nhật") {
      return "Chủ nhật"
    }
    return `Thứ ${charDay}`
}

const CUSTOM_LOCALE = {
  monthNames: [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
  ],
  dayNames: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
  year: '', // letter behind year number -> 2020{year}
}

const REGEX = {
  email: "/^[^\s@]+@[^\s@]+\.[^\s@]+$/",
  password: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,30}$/",
}

const CONSTANTS = {
  TOKEN: "19a407b3-d7ca-481b-afbf-1f135902ce9c",
}

function formattedDate (dateParam) {
  const date = new Date(dateParam);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString()}`;
  return formattedDate;
} 

export default {
  CUSTOM_LOCALE: CUSTOM_LOCALE,
  REGEX: REGEX,
  CONSTANTS: CONSTANTS,
  getDay: getDay,
  formattedDate: formattedDate,
}