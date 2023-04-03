import { StyleSheet, Text, View, Ư } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import homeApi from "../api/home/home";

const PaymentBooking = () => {
    const [url, setUrl] = useState(null);
    // const data = {
    //     nameHotel: this.hotelDetail.name,
    //     nameRoomType: this.roomTypeList[this.numberRoomType].name,
    //     checkIn: parseInt(this.arrivalDate),
    //     checkOut: parseInt(this.leaveDate),
    //     customerId: parseInt(customerId),
    //     roomTypeId: this.roomTypeList[this.numberRoomType].id,
    //     serviceId: this.serviceDetail.id,
    //     hotelId: this.hotelDetail.id,
    //     numberAdult: this.noParent,
    //     numberChildren: this.noChildren,
    //     description: "",
    //     paymentAmount: this.serviceDetail.price * this.numberPerson,
    //   }
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(0);
    useEffect(() => {
        const addBookingRoom = async () => {
            try {
                const data = {
                    amount: 100000,
                    orderInfo: "Mua hang tai cua hang ABC",
                    ip: "192.168.100.3",
                };

                const res = await homeApi.addBookingRoom(data);
                setUrl(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        addBookingRoom();
    }, []);

    const handleNavigationStateChange = navState => {
        if (navState.url.includes('vnp_ResponseCode=00')) {
            // Xử lý dữ liệu thanh toán ở đây
            setIsPaymentSuccess(1);
        } else if (navState.url.includes('vnp_ResponseCode=24')) {
            setIsPaymentSuccess(2);
        }
      };

    return (
        <SafeAreaView style={{flex: 1}}>
            {
                isPaymentSuccess == 0 ? <WebView
                    source={{ uri: url }}
                    onNavigationStateChange={handleNavigationStateChange}
                /> : null
            }
            {
                isPaymentSuccess == 1 ? <View>
                    <Text>Thanh toán đơn hàng thành công</Text>
                </View> : null
            }
            {
                isPaymentSuccess == 2 ? <View>
                    <Text>Đơn hàng đã hủy</Text>
                </View> : null
            }
        </SafeAreaView>
    );
};

export default PaymentBooking;

const styles = StyleSheet.create({});
