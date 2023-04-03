import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import homeApi from '../api/home/home';
import { FlatList } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';

const TransactionHistory = ({navigation}) => {
  const user = useSelector(selectUser);
    
  const [currentId, setCurrentId] = useState(0)
  const [render, setRender] = useState(false)
  const [orderHistory, setOrderHistory] = useState([]);
  const [statusTour, setStatusTour] = useState("");
  const [timeRange, setTimeRange] = useState("");
  useEffect(() => {
    // // Lọc theo status tour
    // if (statusTour && order.status !== statusTour) {
    //   return false;
    // }
    // // Lọc theo khoảng thời gian
    // if (timeRange) {
    //   const orderDate = new Date(order.date);
    //   const startDate = new Date(timeRange);
    //   const endDate = new Date(timeRange);
    //   endDate.setDate(endDate.getDate() + 1);
    //   if (orderDate < startDate || orderDate >= endDate) {
    //     return false;
    //   }
    // }
    const getCustomerByEmail = async () => {
      try {
        const data = {
          customerId: user.id,
          // status: typeOfStatus,
          // startTime: startTime,
          // endTime: startTime,
          page: 0,
          size: 10,
          sort: 'id,desc',
        }
          const res = await homeApi.searchBookingRoom(data);
          setOrderHistory(res.data.data.content)
          setRender(false)
      } catch(err) {
          console.log(err)
      }
    }
    getCustomerByEmail()
  }, [])

  const renderOrderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16 }}>Mã đơn hàng: {item.orderCode}</Text>
        <Text style={{ fontSize: 16 }}>Ngày đặt hàng: {item.orderDate}</Text>
        <Text style={{ fontSize: 16 }}>Tên tour: {item.tourName}</Text>
        <Text style={{ fontSize: 16 }}>Số người: {item.numOfPeople}</Text>
        <Text style={{ fontSize: 16 }}>Tổng tiền: {item.totalPrice}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
        <View>
          <View>
            <Picker
              selectedValue={statusTour}
              onValueChange={(itemValue, itemIndex) => setStatusTour(itemValue)}
            >
              <Picker.Item label="Tất cả" value="" />
              <Picker.Item label="Đang chờ xác nhận" value="waiting" />
              <Picker.Item label="Đã xác nhận" value="confirmed" />
              <Picker.Item label="Hoàn thành" value="completed" />
              <Picker.Item label="Đã hủy" value="cancelled" />
            </Picker>
          </View>
          <View>
            <DatePicker
              style={{ width: "100%" }}
              date={timeRange}
              mode="date"
              placeholder="Chọn khoảng thời gian"
              format="YYYY-MM-DD"
              confirmBtnText="Xác nhận"
              cancelBtnText="Hủy"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => setTimeRange(date)}
            />
          </View>
        </View>
        <View style={{ flex: 1, padding: 16 }}>
          {
            orderHistory.length > 0 ? (
              <FlatList
                data={orderHistory}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Text style={{ fontSize: 16 }}>Không có đơn hàng nào.</Text>
            )
          }
    </View>
    </ScrollView>
  )
}

export default TransactionHistory

const styles = StyleSheet.create({
  title: {
  },
  container: {
    paddingHorizontal: 20,
    marginHorizontal: 'auto',
    width: '100%',
  },
  product: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderTopWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {

  },
  name: {

  },
  color: {

  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  detail: {

  },
})