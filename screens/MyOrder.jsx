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
import DropDownPicker from 'react-native-dropdown-picker';
import utils from '../utils/utils';
import Price from '../utils/Price';

const MyOrder = () => {
    const user = useSelector(selectUser);
    const route = useRoute();
    const navigation = useNavigation();
    const data = route.params?.data;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [typeOfServiceId, setTypeOfServiceId] = useState(1);
    const [listBookingRoom, setListBookingRoom] = useState([]);
    const [totalBookingRoom, setTotalBookingRoom] = useState(0);
    const [listBookingTour, setListBookingTour] = useState([]);
    const [totalBookingTour, setTotalBookingTour] = useState(0);
    const [listOfService, setListOfService] = useState([
        {
            id: 1,
            name: 'Khách sạn & Nghỉ dưỡng',
        },
        {
            id: 2,
            name: 'Vé máy bay',
        },
        {
            id: 3,
            name: 'Tour & Trải nghiệm',
        },
    ]);
    const [listOfStatus, setListOfStatus] = useState([
        {
            id: 0,
            name: 'Đã hủy',
        },
        {
            id: 1,
            name: 'Thành công',
        },
        {
            id: 2,
            name: 'Không thành công',
        },
        {
            id: 3,
            name: 'Đã hoàn',
        },
        {
            id: 4,
            name: 'Chờ xử lý',
        },
    ]);

    useEffect(() => {
        const getListBookingRoom = async () => {
          try {
            const data = {
                customerId: user.id,
                status: typeOfStatus,
                startTime: route.params?.startTime,
                endTime: route.params?.endTime,
                page: 0,
                size: 10,
                sort: 'id,desc',
              }
            const filteredParams = Object.fromEntries(
                Object.entries(data).filter(([_, v]) => v !== null)
              );
              if (typeOfServiceId == 1) {
                  const res = await homeApi.searchBookingRoom(filteredParams);
                  setListBookingRoom(res.data.data.content);
                  setTotalBookingRoom(res.data.data.totalElements);
              } else if (typeOfServiceId == 3) {
                const res = await homeApi.searchBookingTour(filteredParams);
                setListBookingTour(res.data.data.content);
                setTotalBookingTour(res.data.data.totalElements);
              }
          } catch(err) {
              console.log(err)
          }
        }
        getListBookingRoom()
      }, [user.email, render])
  return (
    <View>
        <View style={styles.filter}>
            <TextInput
                placeholder="Mã đơn hàng"
                leading={() => <AntDesign name="search1" size={24} color="#E3AD46" />}
            />
            <TextInput
                placeholder="Khoảng ngày đặt"
                leading={() => <AntDesign name="search1" size={24} color="#E3AD46" />}
                value={nameParam || ""}
            />
            <DropDownPicker
                open={open}
                value={value}
                items={listOfService}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setListOfService}
                onChangeValue={(value) => {
                    setTypeOfServiceId(value);
                }}
            />
            <DropDownPicker
                open={open}
                value={value}
                items={listOfService}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setListOfService}
                onChangeValue={(value) => {
                    setTypeOfServiceId(value);
                }}
            />
        </View>
        <Text style={DefaultStyle.text}>
            Có 
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
            kết quả
        </Text>
        <ScrollView style={{backgroundColor: '#fff'}}>
            {
                typeOfServiceId == 1 && listBookingRoom ? listBookingRoom.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('OrderInforUser', {
                            itemId: item.id,
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
                typeOfServiceId == 3 && listBookingTour ? listBookingTour.map((item, index) => (
                    <TouchableOpacity
                    onPress={() => navigation.navigate('OrderInforUser', {
                        itemId: item.id,
                    })}
                    style={styles.index} key={index}
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
                            style={{ width: 110, height: 110 }}
                            source={{ uri: item.tour?.images[0]?.path }}
                        />
                        <View style={styles.info}>
                            <Text style={[DefaultStyle.text, styles.name]}>{item.tour?.name}</Text>
                            <Text style={[DefaultStyle.text, styles.number]}>Giai đoạn áp dụng: {utils.formattedDate(item.tour?.startDate)} - {utils.formattedDate(item.tour?.endDate)}</Text>
                            <Text style={[DefaultStyle.text, styles.number]}>Hạn sử dụng: {utils.formattedDate(item.tour?.expirationDate)}</Text>
                            <Text style={[DefaultStyle.text, styles.number]}>Số lượng: {item.numberAdult + item.numberChildren}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[DefaultStyle.text, styles.totalMoney]}>
                            Tổng tiền:
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

    },
    wrapper: {
        
    },
    header: {
        borderBottomColor: "ced4da",
        borderBottomWidth: 1,
        paddingBottom: 16,
        marginBottom: 16,
    },
    body: {
        
    },
    info: {
        
    },
    name: {
        
    },
    address: {
        
    },
    status: {
        
    },
    name: {
        
    },
    number: {
        
    },
    number: {
        
    },
    number: {
        
    },
    totalMoney: {
        
    },
})