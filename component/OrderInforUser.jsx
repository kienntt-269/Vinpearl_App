import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import customerApi from '../api/depost/customerApi';
import homeApi from '../api/home/home';
import DefaultStyle from '../theme';
import Price from '../utils/Price';
import utils from '../utils/utils';
import domain from '../api/domain';

const OrderInforUser = ({ route, navigation }) => {
    /* 2. Get the param */
    const { itemId, type } = route.params;

    const [numberDay, setNumberDay] = useState(0)
    const [detailData, setDetailData] = useState([])
    useEffect(() => {
        const getdetailData = async () => {
            try {
                if (type == 'hotel') {
                    const res = await homeApi.getDetailBookingRoom(itemId)
                    console.log(res.data.data)
                    setDetailData(res.data.data)
                } else if (type == 'tour') {
                    const res = await homeApi.getDetailBookingTour(itemId)
                    setDetailData(res.data.data)
                    setNumberDay(Math.round((new Date(res.data?.tour?.startDate).getTime() - new Date(res.data?.paymentDate).getTime())/ 86400000))
                }
            } catch (err) {
                alert(err)
            }
        }
        getdetailData()
    }, [])

    return (
        <View style={{ backgroundColor: '#fff', paddingTop: 20 }}>
            <ScrollView style={styles.container}>
                <View style={styles.groupInforImage}>
                    <Text style={{ fontSize: 20, lineHeight: 26, fontWeight: '600', marginBottom: 13 }}>{detailData?.hotel?.name}</Text>
                    <Image
                        style={{ width: '100%', height: null, aspectRatio: 615 / 400 }}
                        source={{ uri: detailData?.room?.roomTypes?.images[0]?.path?.replace("http://localhost:8080", domain) }}
                    />
                </View>
                <View style={styles.groupInfor}>
                    <Text style={styles.title}>Chi tiết đơn hàng</Text>
                    <View style={styles.itemWrapper}>
                        <View style={styles.groupItem}>
                            <Text style={[DefaultStyle.text, styles.label]}>Mã đơn hàng:</Text>
                            <Text style={[DefaultStyle.text, styles.value]}>{detailData.code}</Text>
                        </View>
                        <View style={styles.groupItem}>
                            <Text style={[DefaultStyle.text, styles.label]}>Trạng thái:</Text>
                            <Text style={[DefaultStyle.text, styles.value]}>
                                {
                                    detailData.paymentStatus == 0 && <Text style={[DefaultStyle.text, styles.fail]}>Đã hủy</Text>
                                }
                                {
                                    detailData.paymentStatus == 1 && <Text style={[DefaultStyle.text, styles.fail]}>Thành công</Text>
                                }
                                {
                                    detailData.paymentStatus == 2 && <Text style={[DefaultStyle.text, styles.fail]}>Đã hoàn</Text>
                                }
                                {
                                    detailData.paymentStatus == 3 && <Text style={[DefaultStyle.text, styles.fail]}>Chờ xử lý</Text>
                                }
                            </Text>
                        </View>
                        <View style={styles.groupItem}>
                            <Text style={[DefaultStyle.text, styles.label]}>Tổng tiền thanh toán:</Text>
                            <Text style={[DefaultStyle.text, styles.value]}>
                                <Price active={true} value={detailData?.paymentAmount || 0}/>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.groupInfor}>
                    <Text style={styles.title}>Thông tin người đặt</Text>
                    <View style={styles.itemWrapper}>
                        <View style={styles.groupItem}>
                            <Text style={[DefaultStyle.text, styles.label]}>Tên khách hàng:</Text>
                            <Text style={[DefaultStyle.text, styles.value]}>{detailData.customer?.fullName}</Text>
                        </View>
                        <View style={styles.groupItem}>
                            <Text style={[DefaultStyle.text, styles.label]}>Email khách hàng:</Text>
                            <Text style={[DefaultStyle.text, styles.value]}>{detailData.customer?.email}</Text>
                        </View>
                        <View style={styles.groupItem}>
                            <Text style={[DefaultStyle.text, styles.label]}>Số điện thoại:</Text>
                            <Text style={[DefaultStyle.text, styles.value]}>{detailData.customer?.phone}</Text>
                        </View>
                        <View style={styles.groupItem}>
                            <Text style={[DefaultStyle.text, styles.label]}>Thời gian giao dịch:</Text>
                            <Text style={[DefaultStyle.text, styles.value]}>{utils.formattedDate(detailData.paymentDate)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.groupInfor}>
                    <Text style={styles.title}>Thông tin đơn hàng</Text>
                    {
                        type == "hotel" ?
                        <View style={styles.detailOrder}>
                            <Image
                                style={{borderRadius: 8, width: '100%', height: 120, marginBottom: 15}}
                                source={{uri: detailData?.room?.roomTypes?.images[0]?.path?.replace("http://localhost:8080", domain)}}
                            />
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Tên khách sạn: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.hotel?.name}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Ngày đặt: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.paymentDate}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Ngày checkin: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.checkIn}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Ngày checkout: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.checkOut}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Số lượng: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.numberAdult + detailData?.numberChildren}</Text>
                            </View>
                        </View> : null
                    }
                    {
                        type == "tour" ?
                        <View style={styles.detailOrder}>
                            <Image
                                style={{borderRadius: 8, width: '100%', height: 120, marginBottom: 15}}
                                source={{uri: detailData?.tour?.images[0]?.path?.replace("http://localhost:8080", domain)}}
                            />
                            <View style={styles.nameDesc}>
                                <Text>{detailData?.tour?.name}</Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={[DefaultStyle.text, styles.label]}>Địa điểm áp dụng</Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.room?.roomTypes?.hotel?.name}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Giai đoạn áp dụng: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.tour?.startDate}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Ngày đặt trước: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{numberDay}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Hạn sử dụng: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.tour?.expirationDate}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Hạn sử dụng: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.tour?.expirationDate}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Số lượng: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}>{detailData?.numberAdult + detailData?.numberChildren}</Text>
                            </View>
                            <View style={styles.groupItem}>
                                <Text style={[DefaultStyle.text, styles.label]}>Mã kiểm tra: </Text>
                                <Text style={[DefaultStyle.text, styles.value]}></Text>
                            </View>
                        </View> : null
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default OrderInforUser

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginHorizontal: 'auto',
        width: '100%',
    },
    groupInforImage: {
        borderWidth: 1,
        borderColor: '#dedede',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 3,
    },
    groupInfor: {
        marginTop: 20
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
        color: '#343a40',
        marginBottom: 12
    },
    label: {
        minWidth: 120,
        fontSize: 12,
        paddingRight: 8,
        color: '#898994',
        fontWeight: '600',
        marginRight: 10,
        lineHeight: 20,
    },
    value: {
        fontSize: 14,
        lineHeight: 20,
        color: '#353c46',
        maxWidth: 217,
        textAlign: 'right',
        fontWeight: '500',
    },
    cancel: {
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 50,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#1464f4',
        width: 150,
    },
    submit: {
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        maxWidth: 440,
        backgroundColor: '#1464f4',
        marginBottom: 50,
        width: 150,
    },
    itemWrapper: {
        paddingVertical: 18,
        paddingHorizontal: 10,
        marginBottom: 16,
        marginRight: 10,
    },
    groupItem: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginBottom: 10
    },
    detailOrder: {

    },
    nameDesc: {
        color: '#343a40',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
    },
    content: {

    },
    titlePlace: {

    },
})