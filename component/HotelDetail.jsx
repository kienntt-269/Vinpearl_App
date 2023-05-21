import { StyleSheet,
  Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import DefaultStyle from '../theme'
import homeApi from '../api/home/home';
import Price from '../utils/Price';
import { Button } from '@react-native-material/core';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper'
import { useDispatch, useSelector } from 'react-redux';
import { addBookingHotel } from '../redux/customerHotel/customerHotelSlice';
import { selectUser } from '../redux/user/userSlice';
import utils from '../utils/utils';
import domain from '../api/domain';

const HotelDetail = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { hotelId, hotelName, checkIn, checkOut, numberAdult, numberChildren } = route.params;
  const [indexShowService, setIndexShowService] = useState(null);
  const [selectServiceIndex, setSelectServiceIndex] = useState(false);
  const [priceService, setPriceService] = useState(0);
  const [showPrice, setShowPrice] = useState(false);
  const [serviceId, setServiceId] = useState(0);
  const [roomType, setRoomType] = useState(0);
  const [listOfRoomType, setListOfRoomType] = useState([]);
  useEffect(() => {
    const getListOfSuggest = async () => {
      try {
        const data = {
          page: 0,
          size: 10,
          hotelId: hotelId,
          startTime: checkIn,
          endTime: checkOut,
          numberPerson: numberAdult + numberChildren,
        }
          const res = await homeApi.searchRoomType(data);
          setListOfRoomType(res.data.data.content);
      } catch(err) {
          console.log(err)
      }
    }
    getListOfSuggest();
  }, [])

  return (
    <View style={styles.hotelDetail}>
      <View style={styles.info}>
        <View style={{flex: 3, borderRightWidth: 1, borderRightColor: '#CCC', alignItems: 'center'}}>
        <Text style={[DefaultStyle.text, styles.header]}>Điểm đến</Text>
        <Text numberOfLines={1} style={[DefaultStyle.text, styles.footer]}>{hotelName}</Text>
        </View>
        <View style={{flex: 2, borderRightWidth: 1, borderRightColor: '#CCC', alignItems: 'center'}}>
          <Text style={[DefaultStyle.text, styles.header]}>Ngày</Text>
          <Text style={[DefaultStyle.text, styles.footer]}>
            {/* 01/04 - 05/04 */}
            {utils.formattedDate(checkIn).slice(0, 5)} - {utils.formattedDate(checkOut).slice(0, 5)}
          </Text>
        </View>
        <View style={{flex: 1, borderRightWidth: 1, borderRightColor: '#CCC', alignItems: 'center'}}>
        <Text style={[DefaultStyle.text, styles.header]}>Phòng</Text>
        <Text style={[DefaultStyle.text, styles.footer]}>1</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={[DefaultStyle.text, styles.header]}>Khách</Text>
        <Text style={[DefaultStyle.text, styles.footer]}>{numberAdult + numberChildren}</Text>
        </View>
      </View>
      {
        showPrice && <View style={styles.navigateBooking}>
          <View style={[DefaultStyle.text, styles.text2]}>
              <Text style={{flex: 1}}>{`Tổng giá (Bao gồm thuế & phí)`}</Text>
              <Text style={{flex: 1}}>
                  <Price active={true} value={priceService * (numberAdult + numberChildren)}/>
              </Text>
          </View>
          <Button
              title="Đặt phòng"
              style={{backgroundColor: '#E8952F', }}
              uppercase={false}
              onPress={() => {
                const dataBooking = {
                  nameHotel: hotelName,
                  nameRoomType: roomType.name,
                  checkIn: checkIn,
                  checkOut: checkOut,
                  customerId: user.id,
                  roomTypeId: roomType.id,
                  serviceId: serviceId,
                  hotelId: hotelId,
                  numberAdult: numberAdult,
                  numberChildren: numberChildren,
                  description: "Đặt hàng tại Vinpearl",
                  paymentAmount: priceService * (numberAdult + numberChildren),
                };
                dispatch(addBookingHotel(dataBooking));
                navigation.navigate('SummaryHotel');
            }}
          />
        </View>
      }
      <ScrollView>
        <Text style={[DefaultStyle.text, styles.numberRoom]}>
          Phòng 1
        </Text>
        {
          listOfRoomType ? listOfRoomType.map((item, index) => (
            <View style={[{padding: 18, }, index == listOfRoomType.length - 1 ? {marginBottom: 150, } : {borderBottomColor: "#E5E9EC", borderBottomWidth: 10, }]} key={index}>
              <Swiper style={{borderRadius: 12, marginBottom: 18}}
                height={170}
                loop
              >
                {
                  item?.images ? item.images.map((image, indexImage) => (
                    <Image
                      key={indexImage} 
                      style={{height: '100%', width: '100%',}}
                      source={{uri: image.path?.replace("http://localhost:8080", domain)}}
                    />
                  )) : null
                }
              </Swiper>
              <Text style={[DefaultStyle.text, styles.name]}>{item.name}</Text>
              <Text>
                <AntDesign name="user" size={18} color="#696DA4" />
                <Text style={[DefaultStyle.text, styles.numberPerson]}>2 người lớn</Text>
              </Text>
              <View>
                {
                  indexShowService !== index ? <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Price active={true} checkHotel={true} value={item?.service.length > 0 ? item?.service.reduce((prev, current) => prev.price < current.price ? prev : current).price : 100}/>
                    <Button
                      onPress={() =>
                        {
                          setIndexShowService(index);
                          setSelectServiceIndex(0);
                          setShowPrice(true);
                          setPriceService(item.service[0].price);
                          setServiceId(item.service[0].id);
                          setRoomType(item)
                        }
                      }
                      uppercase={false}
                      title="Chọn phòng"
                      style={{borderRadius: 8, backgroundColor: '#E8952F'}}
                    />
                  </View> : null
                }
                <View style={{marginTop: 12,}}>
                  {
                    indexShowService === index && item?.service.length > 0 ? item.service.map((itemService, indexService) => (
                      <TouchableOpacity
                        style={selectServiceIndex == indexService ? styles.radioButtonActive : styles.radioButton}
                        key={indexService}
                        onPress={() => {
                            setSelectServiceIndex(indexService);
                            setPriceService(itemService.price);
                            setServiceId(itemService.id);
                          }
                        }
                      >
                        <View style={{flexDirection: 'row'}}>
                          {
                            selectServiceIndex == indexService && <MaterialIcons name="radio-button-on" size={24} color="#E8952F" />
                          }
                          {
                            selectServiceIndex != indexService && <MaterialIcons name="radio-button-off" size={24} color="#CCC" />
                          }
                          <Text style={[DefaultStyle.text, styles.nameService]}>
                            {itemService.name}
                          </Text>
                        </View>
                        { 
                          itemService?.contents ? itemService.contents.map((itemContents, indexContents) => (
                            <View key={indexContents}>
                              <View>
                                {
                                  itemContents?.name && itemContents?.name.includes('Bữa') ? <Image source={{uri: `${domain}/images/home/icon/b2abe8b0f56e45faa5d21e96c62e6922_MealPlan.png`}}/> : null
                                }
                                {
                                  itemContents?.name && itemContents?.name.includes('Voucher Grandworld') ? <Image source={{uri: `${domain}/images/home/icon/54a5a905d08047a1b9f3e81e4e99b089_Hotel Dis- Credit.png`}}/> : null
                                }
                                {
                                  itemContents?.name && itemContents?.name.includes('hoàn/ hủy') ? <Image source={{uri: `${domain}/images/home/icon/calendar-cancel.b2f8a00d.png`}}/> : null
                                }
                                {
                                  itemContents?.name && itemContents?.name.includes('Vé') ? <Image source={{uri: `${domain}/images/home/icon/e911ab39130e4ebabec800ac3af34b30_Vinwonder.png`}}/> : null
                                }
                                <Text numberOfLines={1} style={styles.nameContents}>{itemContents.name}</Text>
                              </View>
                            </View>
                          )) : null
                        }
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                          <Price style={styles.price} active={true} checkHotel={true} value={itemService.price || 1000}/>
                          <Text style={[DefaultStyle.text, {fontSize: 12, fontWeight: '600', color: '#333878'}]}>Xem chi tiết</Text>
                        </View>
                      </TouchableOpacity>
                    )) : null
                  }
                </View>
              </View>
            </View>
          )) : null
        }
      </ScrollView>
    </View>
  )
}

export default HotelDetail

const styles = StyleSheet.create({
  hotelDetail: {

  },
  info: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    borderTopWidth: 1,
    borderTopColor: '#CCC'
  },
  header: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CCC',
  },
  footer: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  numberRoom: {
    padding: 10,
    fontSize: 16,
    fontWeight: '500',
    color: "#E8952F",
    borderBottomColor: "#E8952F",
    borderBottomWidth: 1
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333878',
    marginBottom: 10,
  },
  numberPerson: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    paddingLeft: 10,
  },
  radioButton: {
    padding: 12,
    borderTopColor: '#CCC',
    borderTopWidth: 1,
  },
  radioButtonActive: {
    padding: 12,
    borderColor: '#E8952F',
    borderWidth: 1,
    borderRadius: 8,
  },
  nameService: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    marginLeft: 10,
  },
  price: {
    fontSize: 14,
  },
  nameContents: {
    padding: 5,
    flex: 1,
    fontSize: 12,
  },
  navigateBooking: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text2: {
    flex: 1,
    justifyContent: 'space-between',
    height: 40,
  },
})