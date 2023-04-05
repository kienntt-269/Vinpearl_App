import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import homeApi from '../api/home/home'
import DefaultStyle from '../theme';
import { TextInput } from '@react-native-material/core';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import utils from '../utils/utils';
import Price from '../utils/Price';
import { Picker } from '@react-native-picker/picker';
import { subMonths } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyOrder = async ({route}) => {
    const user = useSelector(selectUser);
    const customerId = await AsyncStorage.getItem(utils.CONSTANTS.CUSTOMER_ID);
    const { time, serviceId, sTatusId} = route?.params || {};
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [typeOfServiceId, setTypeOfServiceId] = useState(1);
    const [statusId, setStatusId] = useState(null);
    const [rangeTime, setRangeTime] = useState([]);
    const [listBookingRoom, setListBookingRoom] = useState([]);
    const [totalBookingRoom, setTotalBookingRoom] = useState(0);
    const [listBookingTour, setListBookingTour] = useState([]);
    const [totalBookingTour, setTotalBookingTour] = useState(0);

    useEffect(() => {
        const now = new Date();
        const sixMonthsAgo = subMonths(now, 6).getTime();
        const twelveMonthsAgo = subMonths(now, 12).getTime();
      
        if (time == 0) {
          setRangeTime([sixMonthsAgo, now.getTime()]);
        } else if (time == 1) {
          setRangeTime([twelveMonthsAgo, sixMonthsAgo]);
        } else if (time == 2) {
            setRangeTime([twelveMonthsAgo, 0]);
        }
    }, [time])

    useEffect(() => {
        if (serviceId) {
          setTypeOfServiceId(serviceId);
        }
    }, [serviceId])

    useEffect(() => {
        if (sTatusId) {
          setStatusId(sTatusId);
        }
    }, [sTatusId])

    useEffect(() => {
        const getListBookingRoom = async () => {
          try {
            const data = {
                customerId: user.id ? user.id : customerId,
                status: statusId,
                startTime: rangeTime[0],
                endTime: rangeTime[1],
                page: 0,
                size: 10,
                sort: 'id,desc',
              }
              console.log(data);
              if (typeOfServiceId == 1) {
                  const res = await homeApi.searchBookingRoom(data);
                  setListBookingTour([]);
                    setTotalBookingTour(0);
                  setListBookingRoom(res.data.data.content);
                  setTotalBookingRoom(res.data.data.totalElements);
              } else if (typeOfServiceId == 3) {
                const res = await homeApi.searchBookingTour(data);
                setListBookingRoom([]);
                setTotalBookingRoom(0);
                setListBookingTour(res.data.data.content);
                setTotalBookingTour(res.data.data.totalElements);
              }
          } catch(err) {
              console.log(err)
          }
        }
        getListBookingRoom()
      }, [typeOfServiceId, statusId, rangeTime])
  return (
    <View  style={{ flex: 1, backgroundColor: '#fff', paddingTop: 30, paddingHorizontal: 20,}}>
        {
            totalBookingRoom == 0 && totalBookingTour == 0 ? <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <Image
                    style={{height: 150, width: 150,}}
                    source={{uri: "http://192.168.1.6:8080/images/home/logo/empty-page.png"}}
                />
                <Text>Không có kết quả tìm kiếm phù hợp</Text>
            </View> : null
        }
        <ScrollView style={{backgroundColor: '#fff'}}>
            <Text style={[DefaultStyle.text, {fontWeight:'500', fontSize: 16, marginVertical: 18}]}>
                <Text>Có </Text>
                {
                    typeOfServiceId == 1 ? <Text style={DefaultStyle.text}>
                         {totalBookingRoom} 
                    </Text> : null
                }
                {
                    typeOfServiceId == 3 ? <Text style={DefaultStyle.text}>
                         {totalBookingTour} 
                    </Text> : null
                }
                <Text> kết quả</Text>
            </Text>
            {
                typeOfServiceId == 1 && totalBookingRoom > 0 ? listBookingRoom.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('OrderInforUser', {
                            itemId: item.id,
                            type: "hotel",
                        })}
                        style={styles.wrapper} key={index}
                    >
                        <View style={styles.header}>
                            <Text style={DefaultStyle.text}>Mã đơn hàng: {item.code} | 
                                {
                                    <Text style={DefaultStyle.text}>{item.hotel?.siteId}</Text>
                                }
                            </Text>
                            {
                                item.paymentStatus === 0 ? (
                                <View style={styles.status}>
                                    <Text style={[DefaultStyle.text, DefaultStyle.fail, ]}>Đã hủy</Text>
                                </View>
                                ) : null
                            }
                            {
                                item.paymentStatus === 1 ? (
                                <View style={styles.status}>
                                    <Text style={[DefaultStyle.text, DefaultStyle.success, ]}>Thành công</Text>
                                </View>
                                ) : null
                            }
                            {
                                item.paymentStatus === 2 ? (
                                <View style={styles.status}>
                                    <Text style={[DefaultStyle.text, DefaultStyle.pending, ]}>Đã hoàn</Text>
                                </View>
                                ) : null
                            }
                            {
                                item.paymentStatus === 2 ? (
                                <View style={styles.status}>
                                    <Text style={[DefaultStyle.text, DefaultStyle.pending, ]}>Chờ xử lý</Text>
                                </View>
                                ) : null
                            }
                        </View>
                        <View style={styles.body}>
                            <Image
                                style={{ width: 110, height: 110 }}
                                source={{ uri: item.hotel?.images[0]?.path }}
                            />
                            <View style={styles.info}>
                                <Text style={[DefaultStyle.text, styles.name]}>{item.hotel?.name}</Text>
                                <Text style={[DefaultStyle.text, styles.address]}>{item.hotel?.address}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )) : null
            }
            {
                typeOfServiceId == 3 && totalBookingTour > 0 ? listBookingTour.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('OrderInforUser', {
                            itemId: item.id,
                            type: "tour",
                        })}
                        style={styles.wrapper} key={index}
                    >
                        <View style={styles.header}>
                            <Text style={DefaultStyle.text}>Mã đơn hàng: {item.code} | 
                                {
                                    <Text style={[DefaultStyle.text, DefaultStyle.text, ]}>{item.tour?.siteId}</Text>
                                }
                            </Text>
                            {
                                item.paymentStatus === 0 ? (
                                <View style={styles.status}>
                                    <Text style={[DefaultStyle.text, DefaultStyle.fail, ]}>Đã hủy</Text>
                                </View>
                                ) : null
                            }
                            {
                                item.paymentStatus === 1 ? (
                                <View style={styles.status}>
                                    <Text style={[DefaultStyle.text, DefaultStyle.success, ]}>Thành công</Text>
                                </View>
                                ) : null
                            }
                            {
                                item.paymentStatus === 2 ? (
                                <View style={styles.status}>
                                    <Text style={[DefaultStyle.text, DefaultStyle.pending, ]}>Đã hoàn</Text>
                                </View>
                                ) : null
                            }
                            {
                                item.paymentStatus === 2 ? (
                                <View style={styles.status}>
                                    <Text style={[DefaultStyle.text, DefaultStyle.pending]}>Chờ xử lý</Text>
                                </View>
                                ) : null
                            }
                        </View>
                        <View style={styles.body}>
                            <Image
                                style={{ width: 80, height: 80 }}
                                source={{ uri: item.tour?.images[0]?.path }}
                            />
                            <View style={styles.info}>
                                <Text style={[DefaultStyle.text, styles.name]}>{item.tour?.name}</Text>
                                <Text style={[DefaultStyle.text, styles.number]}>Giai đoạn áp dụng: {utils.formattedDate(item.tour?.startDate)} - {utils.formattedDate(item.tour?.endDate)}</Text>
                                <Text style={[DefaultStyle.text, styles.number]}>Hạn sử dụng: {utils.formattedDate(item.tour?.expirationDate)}</Text>
                                <Text style={[DefaultStyle.text, styles.number]}>Số lượng: {item.numberAdult + item.numberChildren}</Text>
                            </View>
                        </View>
                        <View style={{marginTop: 16}}>
                            <Text style={[DefaultStyle.text, styles.totalMoney]}>
                                <Text>Tổng tiền: </Text>
                                <Price active={true} value={item.paymentAmount} />
                            </Text>
                        </View>
                    </TouchableOpacity>
                )) : null
            }
        </ScrollView>
    </View>
  )
}

export default MyOrder

const styles = StyleSheet.create({
    filter: {
        paddingHorizontal: 20,
        marginHorizontal: 20,
    },
    wrapper: {
        padding: 16,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 18,
    },
    header: {
        borderBottomColor: "#ced4da",
        borderBottomWidth: 1,
        paddingBottom: 16,
        marginBottom: 16,
    },
    body: {
        flexDirection: 'row',
    },
    info: {
        paddingHorizontal: 15, 
    },
    name: {
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 24,
        color: "#343a40",
        flexWrap: 'wrap',
        maxWidth: 200,
    },
    address: {
        
    },
    status: {
        
    },
    number: {
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 18,
        color: "#969AAB",
        flexWrap: 'wrap',
        maxWidth: 200,
        marginVertical: 2,
    },
    totalMoney: {
        fontSize: 16,
        color: "#969aa2",
        lineHeight: 22,
    },
})