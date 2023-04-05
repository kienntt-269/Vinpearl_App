import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import DefaultStyle from '../theme';
import { Ionicons } from '@expo/vector-icons';
import Price from '../utils/Price';
import { Button } from '@react-native-material/core';
import { useSelector } from 'react-redux';
import utils from '../utils/utils';

const SummaryHotel = ({ route, navigation }) => {
    // const { data } = route.params;
    const bookingHotelDetail = useSelector(state => state.customerHotel.booking);
    const bookingTourDetail = useSelector(state => state.customerTour.booking);

  return (
    <View>
        {
            Object.keys(bookingHotelDetail).length !== 0 ? <View style={styles.summaryHotel}>
                <View style={styles.infoHotel}>
                    <Text style={[DefaultStyle.text, styles.title]}>
                        <FontAwesome5 name="hotel" size={24} color="#E8952F" />
                        Thông tin khách sạn
                    </Text>
                    <View>
                        <Text style={[DefaultStyle.text, styles.nameHotel]}>
                            {bookingHotelDetail?.nameHotel}
                        </Text>
                        <Text style={[DefaultStyle.text, styles.desc]}>
                            {/* 29/03/2023 - 30/03/2023 (1 đêm) */}
                            {utils.formattedDate(bookingHotelDetail?.checkIn)} - {utils.formattedDate(bookingHotelDetail?.checkOut)} ({Math.round((bookingHotelDetail.checkOut - bookingHotelDetail.checkIn) / 86400000)} đêm)
                        </Text>
                        <Text style={[DefaultStyle.text, styles.desc]}>
                            Người lớn / Trẻ em: {bookingHotelDetail.numberAdult} / {bookingHotelDetail.numberChildren}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoRoom}>
                    <Text style={[DefaultStyle.text, styles.title]}>
                        <Ionicons name="bed-outline" size={24} color="#E8952F" />
                        Thông tin phòng
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flex: 1}}>
                            <Text style={[DefaultStyle.text, styles.nameRoom, {fontWeight: '700'}]}>Phòng 1: </Text>
                            <Text numberOfLines={1} style={[DefaultStyle.text, styles.nameRoom]}>{bookingHotelDetail.nameRoomType}</Text>
                        </View>
                        <Price value={bookingHotelDetail.paymentAmount}/>
                    </View>
                </View>
                <View style={styles.total}>
                    <View>
                        <Text style={{fontSize: 14, fontWeight: '600'}}>Tổng cộng</Text>
                        <Text style={{fontSize: 12, fontWeight: '400', color: '#CCC'}}>Giá đã bao gồm thuế và phí</Text>    
                    </View>
                    <Price active={true} value={bookingHotelDetail.paymentAmount}/>
                </View>
                <View style={styles.navigateBooking}>
                    <View style={[DefaultStyle.text, styles.text2]}>
                        <Text style={{flex: 1, fontWeight: '600'}}>{`Tổng giá (Bao gồm thuế & phí)`}</Text>
                        <Text style={{flex: 1}}>
                            <Price active={true} value={bookingHotelDetail.paymentAmount}/>
                        </Text>
                    </View>
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
            </View> : null
        }
        {
            Object.keys(bookingTourDetail).length !== 0 ? <View style={styles.summaryHotel}>
                <View style={styles.infoHotel}>
                    <Text style={[DefaultStyle.text, styles.title]}>
                        <FontAwesome5 name="hotel" size={24} color="#E8952F" />
                        Thông tin tour
                    </Text>
                    <Text style={[DefaultStyle.text, styles.nameHotel]}>{bookingTourDetail?.tourName}</Text>
                    <View>
                        <Text style={[DefaultStyle.text, styles.nameHotel]}>
                            {bookingTourDetail?.hotelName}
                        </Text>
                        <Text style={[DefaultStyle.text, styles.desc]}>
                            Người lớn / Trẻ em: {bookingTourDetail.numberAdult} / {bookingTourDetail.numberChildren}
                        </Text>
                    </View>
                </View>
                <View style={styles.total}>
                    <View>
                        <Text style={{fontSize: 14, fontWeight: '600'}}>Tổng cộng</Text>
                        <Text style={{fontSize: 12, fontWeight: '400', color: '#CCC'}}>Giá đã bao gồm thuế và phí</Text>    
                    </View>
                    <Price active={true} value={bookingTourDetail.paymentAmount}/>
                </View>
                <View style={styles.navigateBooking}>
                    <View style={[DefaultStyle.text, styles.text2]}>
                        <Text style={{flex: 1, fontWeight: '600'}}>{`Tổng giá (Bao gồm thuế & phí)`}</Text>
                        <Text style={{flex: 1}}>
                            <Price active={true} value={bookingTourDetail.paymentAmount}/>
                        </Text>
                    </View>
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
            </View> : null
        }
        
    </View>
  )
}

export default SummaryHotel

const styles = StyleSheet.create({
    summaryHotel: {
        backgroundColor: "#EFEFEF",
        height: '100%',
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
        fontWeight: '700',
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
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0.5,
        borderTopColor: "#CCC",
        
    },
    navigateBooking: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        shadowColor: 'black',
    },
    text2: {
        flexWrap: 'wrap',
    },
})