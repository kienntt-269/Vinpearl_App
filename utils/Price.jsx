import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Price = ({ value, active, checkHotel, style }) => {
  const formattedPrice = value ? value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }) : '1.000.000';


  return <Text style={[active ? styles.primary : styles.default, style]}>
    {formattedPrice}
    {checkHotel ? <Text>/đêm</Text> : null}
  </Text>;
};

const styles = StyleSheet.create({
    default: {
      color: "#000",
      fontSize: 18,
      fontWeight: 700
    },
    primary: {
      color: "#E8952F",
      fontSize: 18,
      fontWeight: 700
    },
});

export default Price;