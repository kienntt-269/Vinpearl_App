import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@react-native-material/core'
import Price from './Price'

const ButtonFooter = ({ route, navigation, nameNavigate, nameTitle, price }) => {
  return (
    <View style={styles.navigateBooking}>
        <Text style={[DefaultStyle.text, styles.text2]}>
            <Text style={{width: '100%'}}>{`Tổng giá (Bao gồm thuế & phí)`}</Text>
            <Text style={{width: '100%'}}>
                <Price active={true} value={price}/>
            </Text>
        </Text>
        <Button
            title={nameTitle}
            style={{backgroundColor: '#E8952F', }}
            uppercase={false}
            onPress={() => navigation.navigate(nameNavigate, {
                // tourId: Tour.id,
                name: "name",
            })}
        />
      </View>
  )
}

export default ButtonFooter

const styles = StyleSheet.create({
    navigateBooking: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text2: {
        flexWrap: 'wrap',
    },
})