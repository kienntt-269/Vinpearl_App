import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Price = ({ value }) => {
  const formattedPrice = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return <Text style={styles.primary}>{formattedPrice} đ</Text>;
};

const styles = StyleSheet.create({
    primary: {
        color: "#CCC",
    }
});

export default Price;