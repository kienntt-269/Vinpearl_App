import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import customerApi from '../api/depost/customerApi';

const OrderInforUser = ({ route, navigation }) => {
    /* 2. Get the param */
    const { itemId } = route.params;

    const [orderDetail, SetOrderDetail] = useState([])
    const [render, setRender] = useState(false)
    useEffect(() => {
        const getOrderDetail = async () => {
            try {
                const res = await customerApi.getOne(itemId)
                SetOrderDetail(res.data)
                setRender(false)
                console.log(res.data)
            } catch (err) {
                alert(err)
            }
        }
        getOrderDetail()
    }, [render])

    const onSubmit = async () => {
        const data = {
            id: itemId,
            status: 'success',
        }
        try {
            const res = await customerApi.update(data)
            setRender(true)
            console.log(res)
        } catch (err) {
            alert(err)
        }
    }

    const onCancel = async () => {
        const data = {
            id: itemId,
            status: 'fail',
        }
        try {
            const res = await customerApi.update(data)
            setRender(true)
            console.log(res)
        } catch (err) {
            alert(err)
        }
    }
    return (
        <View style={{ backgroundColor: '#fff', paddingTop: 20 }}>
            <ScrollView style={styles.container}>
                <View style={styles.groupInforImage}>
                    <Text style={{ fontSize: 20, lineHeight: 26, fontWeight: '600', marginBottom: 13, textTransform: 'uppercase' }}>{orderDetail.name} - {orderDetail.color}</Text>
                    <Image
                        style={{ width: '100%', height: null, aspectRatio: 615 / 400 }}
                        source={{ uri: orderDetail.path }}
                    />
                </View>
                <View style={styles.groupInfor}>
                    <Text style={styles.title}>Thông tin chung</Text>
                    <View style={styles.groupItem}>
                        <Text style={styles.th}>Mã đơn hàng</Text>
                        <Text style={styles.td}>{orderDetail.id}</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Text style={styles.th}>Ngày đặt hàng</Text>
                        <Text style={styles.td}>{orderDetail.created_date}</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Text style={styles.th}>Trạng thái</Text>
                        <Text style={[styles.td, {
                            paddingVertical: 4, paddingHorizontal: 16, borderRadius: 20, fontSize: 13, lineHeight: 16, fontWeight: '700',
                            backgroundColor: orderDetail.status === 'fail' ? '#EBEBEB' : (orderDetail.status === 'success' ? '#28A745' : '#FFC107')
                        }]}>
                            {orderDetail.status === 'success' ? 'Thành công' : null}
                            {orderDetail.status === 'pending' ? 'Đang chờ xử lý' : null}
                            {orderDetail.status === 'fail' ? 'Đã hủy' : null}
                        </Text>
                    </View>
                </View>
                <View style={styles.groupInfor}>
                    <Text style={styles.title}>Thông tin chủ xe</Text>
                    <View style={styles.groupItem}>
                        <Text style={styles.th}>Họ và tên</Text>
                        <Text style={styles.td}>{orderDetail.user_name}</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Text style={styles.th}>CMND/CCCD</Text>
                        <Text style={styles.td}>{orderDetail.cccd}</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Text style={styles.th}>Số điện thoại</Text>
                        <Text style={styles.td}>{orderDetail.phone}</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Text style={styles.th}>Email</Text>
                        <Text style={styles.td}>{orderDetail.email}</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Text style={styles.th}>Tỉnh thành</Text>
                        <Text style={styles.td}>{orderDetail.province}</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Text style={styles.th}>Showroom nhận xe</Text>
                        <Text style={styles.td}>SR Trần Duy Hưng - Hà Nội</Text>
                    </View>
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
        textTransform: 'uppercase',
        lineHeight: 22,
        color: '#1a1a1a',
        marginBottom: 24
    },
    th: {
        minWidth: 120,
        fontSize: 16,
        lineHeight: 24,
        paddingRight: 8,
        color: '#979797',
        fontWeight: '600'
    },
    td: {
        fontSize: 16,
        lineHeight: 24,
        color: '#3c3c3c',
        maxWidth: 217,
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
    groupItem: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginBottom: 10
    },
})