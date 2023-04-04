import { StyleSheet, ScrollView, View, Text, Image, } from 'react-native'
import React, {useEffect, useState} from 'react'
import homeApi from '../api/home/home';
import DefaultStyle from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import Price from '../utils/Price';

const ResultSearchHotel = ({ route, navigation }) => {
  /* 2. Get the param */
    const { siteId, checkIn, checkOut, numberAdult, numberChildren } = route.params;
    const [listOfHotel, setListOfHotel] = useState([])
    useEffect(() => {
      const getListOfHotel = async () => {
        try {
          const data = {
            siteId: siteId ? siteId : "",
            page: 0,
            size: 20,
            sort: 'id,desc',
          }
            const res = await homeApi.searchHotel(data);
            console.log(res.data.data.content);
            setListOfHotel(res.data.data.content);
        } catch(err) {
            console.log(err)
        }
      }
      getListOfHotel();
    }, [])
    console.log(listOfHotel);
  return (
    <View style={styles.resultSearchHotel}>
        <ScrollView style={{paddingHorizontal: 15,}}>
          {
            listOfHotel ? listOfHotel.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.itemWrapper}
                onPress={() => navigation.navigate('HotelDetail', {
                    hotelId: item.id,
                    hotelName: item.name,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    numberAdult: numberAdult,
                    numberChildren: numberChildren,
                })}
              >
                <Image 
                  style={{width: '100%', height: 170, width: '100%', borderRadius: 14}}
                  source={{uri: item.path}}
                />
                <View style={styles.description}>
                  <Text style={[DefaultStyle.text, styles.name]}>{item.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <EvilIcons name="location" size={20} color="black" />
                    <Text numberOfLines={1} style={[DefaultStyle.text, styles.address]}>{item.address}</Text>
                  </View>
                  <View style={styles.price}>
                    <Text style={[DefaultStyle.text, {fontSize: 13, fontWeight: '700'}]}>Giá khách sạn</Text>
                    <Price checkHotel={true} active={true} value={parseInt(item.priceMin)}/>
                  </View>
                </View>
              </TouchableOpacity>
            )) : null
          }
        </ScrollView>
    </View>
  )
}

export default ResultSearchHotel

const styles = StyleSheet.create({
    resultSearchHotel: {

    },
    itemWrapper: {
      marginTop: 15,
    },
    description: {
      padding: 15,
      backgroundColor: '#FFF',
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: '#374079',
      marginBottom: 15
    },
    address: {
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 4,
      paddingRight: 15,
    },
    price: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
})