import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import DefaultStyle from '../theme';
import { Ionicons } from '@expo/vector-icons';
import Price from '../utils/Price';
import { Button } from '@react-native-material/core';

const SummaryHotel = ({ route, navigation }) => {
    const { serviceId, roomTypeId, name } = route.params;

  return (
    <View style={styles.summaryHotel}>
      <View style={styles.infoHotel}>
        <Text style={[DefaultStyle.text, styles.title]}>
            <FontAwesome5 name="hotel" size={24} color="#E8952F" />
            Thông tin khách sạn
        </Text>
        <View>
            <Text style={[DefaultStyle.text, styles.nameHotel]}>
                {name}
            </Text>
            <Text style={[DefaultStyle.text, styles.desc]}>
                29/03/2023 - 30/03/2023 (1 đêm)
            </Text>
            <Text style={[DefaultStyle.text, styles.desc]}>
                Người lớn / Trẻ em: 2 / 0
            </Text>
        </View>
      </View>
      <View style={styles.infoRoom}>
        <Text style={[DefaultStyle.text, styles.title]}>
            <Ionicons name="bed-outline" size={24} color="#E8952F" />
            Thông tin phòng
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={[DefaultStyle.text, styles.nameRoom]}>
                Phòng 1
                <Text style={{fontWeight: '400', }}>Studio Suite</Text>
            </Text>
            <Price value={55000000}/>
        </View>
      </View>
      <View style={styles.total}>
        <Text style={{fontSize: 14, fontWeight: '500'}}>
            Tổng cộng
            <Text style={{fontSize: 12, fontWeight: '400', color: '#CCC'}}>Giá đã bao gồm thuế và phí</Text>    
        </Text>
        <Price active={true} value={55000000}/>
      </View>
      <View style={styles.navigateBooking}>
        <Text style={[DefaultStyle.text, styles.text2]}>
            <Text style={{width: '100%'}}>{`Tổng giá (Bao gồm thuế & phí)`}</Text>
            <Text style={{width: '100%'}}>
                <Price active={true} value={55000000}/>
            </Text>
        </Text>
        <Button
            title="Đặt ngay"
            style={{backgroundColor: '#E8952F', }}
            uppercase={false}
            onPress={() => navigation.navigate('FormBooking', {
                // tourId: Tour.id,
                name: "name",
            })}
        />
      </View>
    </View>
  )
}

export default SummaryHotel

const styles = StyleSheet.create({
    summaryHotel: {
        backgroundColor: "#EFEFEF",

    },
    infoHotel: {
        padding: 20,
        backgroundColor: '#FFF',
    },
    infoRoom: {
        padding: 20,
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    title: {
        marginBottom: 20,
    },
    nameHotel: {
        fontWeight: '600',
        color: '#374079',
    },
    desc: {
        paddingVertical: 4,
    },
    nameRoom: {
        fontSize: 14,
        fontWeight: '600',
    },
    total: {
        padding: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
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