import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");

export const COLORS = {
    mainColor: '#2c72c6',
    secondColor: '#62b4ff',
    txtColor: '#1f2125',

    blue: '#2c72c6',
    indigo: '#6610f2',
    purple: '#6f42c1',
    pink: '#e83e8c',
    red: '#dc3545',
    orange: '#fd7e14',
    yellow: '#ffc107',
    green: '#28a745',
    teal: '#20c997',
    cyan: '#17a2b8',
    white: '#fff',
    black: '#1f2125',
    gray: '#6c757d',
    grayDark: '#343a40',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40',
    sliver: '#999999',

    mainBg: '#ffffff',
    secondBg: '#fafafb',
};

export const SIZES = {
    //global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    //font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    //app dimensions
    width,
    height
}

export const FONTS = {
    largeTitle: {fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 56},
    h1: {fontFamily: "Roboto-regular", fontSize: SIZES.h1, lineHeight: 36},
    h2: {fontFamily: "Roboto-regular", fontSize: SIZES.h2, lineHeight: 30},
    h3: {fontFamily: "Roboto-regular", fontSize: SIZES.h3, lineHeight: 22},
    h4: {fontFamily: "Roboto-regular", fontSize: SIZES.h4, lineHeight: 22},
    body1: {fontFamily: "Roboto-regular", fontSize: SIZES.body1, lineHeight: 36},
    body2: {fontFamily: "Roboto-regular", fontSize: SIZES.body2, lineHeight: 30},
    body3: {fontFamily: "Roboto-regular", fontSize: SIZES.body3, lineHeight: 22},
    body4: {fontFamily: "Roboto-regular", fontSize: SIZES.body4, lineHeight: 22},
    body5: {fontFamily: "Roboto-regular", fontSize: SIZES.body5, lineHeight: 22},
}