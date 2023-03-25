import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import customerApi from '../api/depost/customerApi';

const Cart = () => {
  const user = useSelector(selectUser);
    
  const [customerData, setCustomerData] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const [render, setRender] = useState(false)
  console.log(currentId)
  useEffect(() => {
    const getCustomerByEmail = async () => {
      try {
          const res = await customerApi.getByEmail(user.email)
          setCustomerData(res.data)
          setRender(false)
      } catch(err) {
          console.log(err)
      }
    }
    getCustomerByEmail()
  }, [user.email,currentId, render])
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      {/* <Text style={styles.title}>Lịch sử đơn hàng</Text> */}
        {
          customerData ? customerData.map((item, index) => (
            <View key={index}>
              <View style={styles.product}>
                <View style={styles.image}>
                  <Image 
                      style={{width: 100, height: 65}}
                      source={{uri: item.path}}
                  />
                </View>
                <View style={styles.name}>
                  <Text>
                    {
                      item.product_role === 'car' ? 'Xe ô tô' : 'Xe máy điện'
                    }
                  </Text>
                  <Text>{item.name}</Text>
                </View>
                <View style={styles.color}>
                  <Text>Màu xe</Text>
                  <Text>{item.color}</Text>
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.time}>
                    <Text>Thời gian</Text>
                    <Text>{item.created_date}</Text>
                  </View>
                <View style={styles.status}>
                    <Text>
                      Thành công
                    </Text>
                    <Text style={styles.detail}>Chi tiết</Text>
                </View>
              </View>
            </View>
          )) : null
        }
    </ScrollView>
  )
}

export default Cart

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