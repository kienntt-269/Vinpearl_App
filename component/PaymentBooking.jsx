import { StyleSheet, Text, View, Ư } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import homeApi from "../api/home/home";
import { useSelector } from "react-redux";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import DefaultStyle from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { removeBookingHotel } from "../redux/customerHotel/customerHotelSlice";
import queryString from 'query-string';
import { removeBookingTour } from "../redux/customerTour/customerTourSlice";

const PaymentBooking = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const bookingHotelDetail = useSelector(state => state.customerHotel.booking);
    const bookingTourDetail = useSelector(state => state.customerTour.booking);
    const [url, setUrl] = useState(null);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(0);
    useEffect(() => {
        const addBookingRoom = async () => {
            try {
                const res = await homeApi.addBookingRoom(bookingHotelDetail);
                setUrl(res?.data?.data?.url);
            } catch (err) {
                console.log(err);
            }
        };
        const addBookingTour = async () => {
            try {
                const res = await homeApi.addBookingTour(bookingTourDetail);
                setUrl(res?.data?.data?.url);
            } catch (err) {
                console.log(err);
            }
        };
        if (bookingHotelDetail) {
            addBookingRoom();
        } else if (bookingTourDetail) {
            addBookingTour();
        } else {
            navigation.navigate("Trang chủ");
        }
    }, []);

    const checkBookingRoom = async (code) => {
        try {
            const res = await homeApi.getBookingRoomByPaymentCode(code);
            console.log(res.data);
            if (res.data.code === 200) {
                const res1 = await homeApi.checkBookingRoomOK(code, res.data.data.id);
                if (res1.data.code === 200) {
                    console.log("booking ok!");
                    setIsPaymentSuccess(2);
                    dispatch(removeBookingHotel(bookingHotelDetail));
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const checkBookingTour = async (code) => {
        try {
            const res = await homeApi.getBookingTourByPaymentCode(code);
            console.log(res.data);
            if (res.data.code === 200) {
                const res1 = await homeApi.checkBookingTourOK(code, res.data.data.id);
                if (res1.data.code === 200) {
                    console.log("booking ok!");
                    setIsPaymentSuccess(2);
                    dispatch(removeBookingTour(bookingTourDetail));
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleNavigationStateChange = navState => {
        if (navState.url.includes('vnp_ResponseCode=00')) {
            // Xử lý dữ liệu thanh toán ở đây
            if (url) {
                const vnpTxnRef = queryString.parseUrl(url).query.vnp_TxnRef;
                if (vnpTxnRef.includes('Hotel')) {
                    checkBookingRoom(vnpTxnRef);
                } else if (vnpTxnRef.includes('Tour')) {
                    checkBookingTour(vnpTxnRef);
                }
            }

        } else if (navState.url.includes('vnp_ResponseCode=24')) {
            setIsPaymentSuccess(3);
        }
      };
    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF'}}>
            {
                isPaymentSuccess == 0 ? <WebView
                    source={{ uri: url }}
                    onNavigationStateChange={handleNavigationStateChange}
                /> : null
            }
            {
                isPaymentSuccess == 2 ? 
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <FontAwesome5 name="check-circle" size={70} color="#2dce89" />
                    <Text style={[DefaultStyle.text, styles.status]}>Thanh toán thành công!</Text>
                    <Text style={[DefaultStyle.text, styles.desc]}>Cảm ơn bạn đã đặt hàng tại app của chúng tôi. Hãy để ý email của bạn để kiểm tra lại thông tin nhận phòng</Text>
                </View> : null
            }
            {
                isPaymentSuccess == 3 ? 
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <AntDesign name="closecircle" size={80} color="#DE3645" />
                    <Text style={[DefaultStyle.text, styles.status]}> Thanh toán đã hủy!</Text>
                    <Text style={[DefaultStyle.text, styles.status]}>Rất tiếc bạn đã hủy đơn hàng. Nếu bạn muốn đặt lại vui lòng thực hiện lại giao dịch.</Text>
                </View> : null
            }
            {/* {
                !isPaymentSuccess ? 
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <AntDesign name="closecircle" size={80} color="#DE3645" />
                    <Text style={[DefaultStyle.text, styles.status]}>Thanh toán thất bại!</Text>
                    <Text style={[DefaultStyle.text, styles.status]}>Rất tiếc, đã xảy ra lỗi với đơn hàng của bạn. Vui lòng thử lại hoặc liên hệ hotline 1900232389 (nhánh 3) để biết thêm chi tiết.</Text>
                </View> : null
            } */}
            {
                isPaymentSuccess && isPaymentSuccess != 0 ? 
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 15}}>
                    <Text style={[DefaultStyle.text, styles.contact]}>Liên hệ ngay</Text>
                    <Text
                        style={[DefaultStyle.text, styles.goHome]}
                        onPress={() => navigation.navigate('Trang chủ')}
                    >Về trang chủ</Text>
                </View> : null
            }
        </SafeAreaView>
    );
};

export default PaymentBooking;

const styles = StyleSheet.create({
    status: {
        fontSize: 15,
        fontWeight: '700',
        paddingVertical: 15,
    },
    desc: {
        fontSize: 13,
        fontWeight: '600',
        color: "#B0B2B4",
    },
    contact: {
        fontSize: 15,
        fontWeight: '500',
        color: '#E8952F',
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderColor: "#E8952F",
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    goHome: {
        backgroundColor: '#E8952F',
        color: '#FFF',
        borderWidth: 1,
        borderColor: "#E8952F",
        borderRadius: 8,
        paddingHorizontal: 40,
        paddingVertical: 10,
    }
});
