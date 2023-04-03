import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@react-native-material/core'

const ConfirmBooking = ({ route, navigation }) => {
  return (
    <View>
      <Text>ConfirmBooking</Text>
      <Button
            title="Thanh toán"
            style={{backgroundColor: '#E8952F', }}
            uppercase={false}
            onPress={() => navigation.navigate('PaymentBooking', {
                // tourId: Tour.id,
                name: "name",
            })}
        />
        
    </View>
  )
}

export default ConfirmBooking

const styles = StyleSheet.create({})