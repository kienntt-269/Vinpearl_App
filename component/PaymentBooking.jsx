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

const PaymentBooking = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const bookingHotelDetail = useSelector(state => state.customerHotel.booking);
    const [url, setUrl] = useState(null);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(0);
    useEffect(() => {
        const addBookingRoom = async () => {
            try {
                const res = await homeApi.addBookingRoom(bookingHotelDetail);
                setUrl(res?.data?.data?.url);
                console.log(res?.data?.data?.url);
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

        if (bookingHotelDetail) {
            dispatch(removeBookingHotel(bookingHotelDetail));
        }
      };
      console.log(url);
    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF'}}>
            {
                isPaymentSuccess == 0 ? <WebView
                    source={{ uri: url }}
                    onNavigationStateChange={handleNavigationStateChange}
                /> : null
            }
            {
                isPaymentSuccess == 1 ? 
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <FontAwesome5 name="check-circle" size={70} color="#2dce89" />
                    <Text style={[DefaultStyle.text, styles.status]}>Thanh toán thành công!</Text>
                    <Text style={[DefaultStyle.text, styles.desc]}>Cảm ơn bạn đã đặt hàng tại app của chúng tôi. Hãy để ý email của bạn để kiểm tra lại thông tin nhận phòng</Text>
                </View> : null
            }
            {
                isPaymentSuccess == 2 ? 
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
