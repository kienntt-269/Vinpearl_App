import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, ImageBackground, useWindowDimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import homeApi from '../api/home/home';
import Price from '../utils/Price';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import { Button } from '@react-native-material/core';
import DefaultStyle from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart  } from '../redux/tour-cart/cartItemsSlide';
import { addBookingTour } from '../redux/customerTour/customerTourSlide';
import { selectUser } from '../redux/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import utils from '../utils/utils';

const TourDetail = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    /* 2. Get the param */
    const { itemId } = route.params;
    const { nameParam } = route.params;
    const layout = useWindowDimensions();

    const [indexRoute, setIndexRoute] = useState(0);
    const [index, setIndex] = useState(0);
    
    const [tourDetail, setTourDetail] = useState({});
    const [hotelList, setHotelList] = useState([]);
    const [priceAdultMin, setPriceAdultMin] = useState(0);
    const [priceAdultSelect, setPriceAdultSelect] = useState(0);
    const [priceChildrenSelect, setPriceChildrenSelect] = useState(0);
    const customerId = AsyncStorage.getItem(utils.CONSTANTS.TOKEN);
    useEffect(() => {
        const getListOfSuggest = async () => {
          try {
              const res = await homeApi.getTourDetail(itemId);
              setTourDetail(res.data.data[0].tour);
              let priceAdultMin = 0;
                priceAdultMin =res.data.data[0].priceAdult;
              res.data.data.forEach((item, index) => {
                if (item.priceAdult < priceAdultMin) {
                    priceAdultMin = item.priceAdult;
                  }
                  setPriceAdultMin(priceAdultMin);
              })
              setHotelList(res.data.data);
          } catch(err) {
              console.log(err)
          }
        }
        getListOfSuggest();
    }, []);

    const cartItem = useSelector(state =>
        state.cart?.find(item => item.id === id)
    );

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price }));
    };  

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(id));
    };

    return (
        <View style={{flex: 1}}>
            {
                tourDetail ? 
                <ScrollView style={{backgroundColor: '#FFF'}}>
                    <Image 
                        style={{height: 224, width: '100%', borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}
                        source={{uri: 'http://192.168.1.11:8080/images/home/banner.png'}}
                    />
                    <View>
                    {/* {
                        cartItem ? (
                            <Button
                                title="Xóa khỏi giỏ hàng"
                                onPress={handleRemoveFromCart}
                            />
                        ) : (
                            <Button
                                title="Thêm vào giỏ hàng"
                                onPress={handleAddToCart}
                            />
                        )
                    } */}
                    </View>
                    <View style={styles.TourDetail}>
                        <View style={{paddingVertical: 15,}}>
                            <Text style={[DefaultStyle.text, styles.title]}>{tourDetail?.name}</Text>
                            <View style={styles.code}>
                                <Text style={[DefaultStyle.text, {color: '#9B9B9B'}]}>Mã sản phẩm: </Text>
                                <Text style={[DefaultStyle.text, {color: '#818181', fontWeight: '700',}]}>{tourDetail?.code || 'GN00666'}</Text>
                            </View>
                            <View style={styles.price}>
                                <Text style={[DefaultStyle.text, {marginRight: 5}]}>Chỉ từ</Text>
                                <View style={styles.price}>
                                    <Price active={true} value={priceAdultMin}/>
                                </View>
                            </View>
                        </View>
                        <View style={styles.description}>
                            <View style={[DefaultStyle.text, styles.descriptionText]}>
                                <MaterialIcons name="attach-money" size={20} color="#E9A973" />
                                <Text style={[DefaultStyle.text, styles.text1]}>Giá luôn tốt nhất</Text>
                            </View>
                            <View style={[DefaultStyle.text, styles.descriptionText]}>
                                <AntDesign name="like2" size={20} color="#E9A973" />
                                <Text style={[DefaultStyle.text, styles.text1]}>Không phí thanh toán</Text>
                            </View>
                            <View style={[DefaultStyle.text, styles.descriptionText]}>
                                <MaterialCommunityIcons name="update" size={20} color="#E9A973" />
                                <Text style={[DefaultStyle.text, styles.text1]}>Xác nhận tức thì</Text>
                            </View>
                        </View>
                        <View style={styles.description}>
                            <View style={[DefaultStyle.text, styles.descriptionText]}>
                                <AntDesign name="check" size={20} color="#E9A973" />
                                <Text style={[DefaultStyle.text, styles.text1]}>02 đêm phòng</Text>
                            </View>
                            <View style={[DefaultStyle.text, styles.descriptionText]}>
                                <AntDesign name="check" size={20} color="#E9A973" />
                                <Text style={[DefaultStyle.text, styles.text1]}>Ăn sáng mỗi ngày</Text>
                            </View>
                        </View>
                        <View>
                        <View style={styles.tabs}>
                            <Text style={[DefaultStyle.text, styles.tabsTitle]}>Chọn gói dịch vụ</Text>
                            <View style={[styles.serviceContainer, {flex: 1 }]} >
                                {
                                    hotelList ? hotelList.map((item, index) => (
                                        <TouchableOpacity
                                            style={indexRoute == index ? styles.serviceWrapperActive : styles.serviceWrapper}
                                            key={index}
                                            onPress={() => {
                                                setIndexRoute(index);
                                                setPriceAdultSelect(item.priceAdult);
                                                setPriceChildrenSelect(item.priceChildren);
                                            }}
                                        >
                                            <Text style={[DefaultStyle.text, indexRoute == index ? styles.textFirstActive : styles.textFirst]}>Combo 3D2N tại {item.hotel.name}</Text>
                                            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                                <Price active={indexRoute == index} value={item.priceAdult} />
                                            </View>
                                        </TouchableOpacity>
                                    )) : <Text>Lỗi</Text>
                                }
                            </View>
                            <View style={[styles.container, {flex: 1 }]} >
                                <Text style={[DefaultStyle.text, styles.tabsTitle]}>Mô tả</Text>
                                <RenderHtml
                                    contentWidth={layout.width}
                                    classesStyles={styles}
                                    source={{html: tourDetail?.description}}
                                />
                            </View>
                            <View style={[styles.container, {flex: 1 }]} >
                                <Text style={[DefaultStyle.text, styles.tabsTitle]}>Bao gồm</Text>
                                <RenderHtml
                                    contentWidth={layout.width}
                                    source={{html: tourDetail.inclusion}}
                                />
                            </View>
                            <View style={[styles.container, {flex: 1 }]} >
                                <Text style={[DefaultStyle.text, styles.tabsTitle]}>Điều khoản</Text>
                                <RenderHtml
                                    contentWidth={layout.width}
                                    source={{html: tourDetail.termsConditions}}
                                />
                            </View>
                            <View style={[styles.container, {flex: 1 }]} >
                                <Text style={[DefaultStyle.text, styles.tabsTitle]}>Chính sách hoàn hủy</Text>
                                <RenderHtml
                                    contentWidth={layout.width}
                                    source={{html: tourDetail.termsConditions}}
                                />
                            </View>
                            <View style={[styles.container, {flex: 1 }]} >
                                <Text style={[DefaultStyle.text, styles.tabsTitle]}>Hướng dẫn sử dụng</Text>
                                <RenderHtml
                                    contentWidth={layout.width}
                                    source={{html: tourDetail.termsConditions}}
                                />
                            </View>
                        </View>
                        </View>
                    </View>
                </ScrollView> : null
            }
            <View style={styles.navigateBooking}>
                <View style={[DefaultStyle.text, styles.text2]}>
                    <Text style={{flex: 1, color: '#919191', fontWeight: '500'}}>{`Tổng giá (Bao gồm thuế & phí)`}</Text>
                    <Text style={{flex: 1}}>
                        <Price active={true} value={priceAdultSelect * 2 + priceChildrenSelect * 2}/>
                    </Text>
                </View>
                <Button
                    title="Đặt ngay"
                    style={{backgroundColor: '#E8952F', }}
                    uppercase={false}
                    onPress={() => {
                        const dataBookingTour = {
                            tourId: tourDetail.id,
                            tourName: tourDetail.name,
                            hotelId: hotelList[indexRoute]?.id,
                            hotelName: hotelList[indexRoute]?.name,
                            customerId: user.id || customerId,
                            numberAdult: 2,
                            numberChildren: 2,
                            description: "Đặt tour tại Vinpearl",
                            paymentAmount: priceAdultSelect * 2 + priceChildrenSelect * 2,
                        };
                        dispatch(addBookingTour(dataBookingTour));
                        navigation.navigate('SummaryHotel', {
                          data: dataBookingTour,
                        });
                      }}
                />
            </View>
        </View>
    )
}

export default TourDetail

const styles = StyleSheet.create({
    container: {

    },
    TourDetail: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    code: {
        flexDirection: 'row'
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        color: '#9B9B9B',
        alignItems: 'center',
    },
    description: {
        paddingVertical: 20,
        borderTopColor: '#CCC',
        borderBottomColor: '#CCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        backgroundColor: "#FFF",
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '500',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    text1: {
        marginLeft: 15,
        paddingVertical: 2,
        fontSize: 14,
        fontWeight: '400',
    },
    tabs: {
        backgroundColor: "#FFF",
        borderTopColor: "#EFEFEF",
        borderTopWidth: 10,
    },
    tabsTitle: {
        fontSize: 20,
        fontWeight: '700',
        borderLeftColor: '#E49630',
        borderLeftWidth: 5,
        marginVertical: 20,
        paddingLeft: 12,
    },
    textFirst: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        backgroundColor: '#F4F4F4',
    },
    textFirstActive: {
        fontSize: 14,
        fontWeight: '600',
        color: '#EBAB72',
    },
    serviceContainer: {
        width: '100%',
    },
    serviceWrapper: {
        paddingVertical: 15,
        backgroundColor: '#F4F4F4',
        paddingVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    serviceWrapperActive: {
        backgroundColor: '#FCF2E6',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#EBAB72',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
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
