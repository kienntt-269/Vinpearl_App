import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import OrderManagement from '../component/OrderManagement';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';

const K_OPTIONS_SELL = [
  {
    id: '1',
    icon: 'user-circle-o',
    title: 'Thông tin cá nhân',
    optionNavigate: 'PersonalInfo'
  },
  {
    id: '2',
    icon: 'history',
    title: 'Lịch sử đơn hàng',
    optionNavigate: 'TransactionHistory'
  },
  {
    id: '3',
    icon: 'cart-arrow-down',
    title: 'Giỏ hàng',
    optionNavigate: 'Cart'
  },
  {
    id: '4',
    icon: 'user-circle',
    title: 'Quản lý đơn hàng',
    optionNavigate: 'OrderManagement'
  },
  {
    id: '5',
    icon: 'user-circle',
    title: 'Đăng xuất',
    optionNavigate: 'Login'
  },
]

const K_OPTIONS_USER = [
  {
    id: '1',
    icon: 'user-circle-o',
    title: 'Thông tin cá nhân',
    optionNavigate: 'PersonalInfo'
  },
  {
    id: '2',
    icon: 'history',
    title: 'Lịch sử đơn hàng',
    optionNavigate: 'TransactionHistory'
  },
  {
    id: '3',
    icon: 'cart-arrow-down',
    title: 'Giỏ hàng',
    optionNavigate: 'Cart'
  },
  {
    id: '5',
    icon: 'user-circle',
    title: 'Đăng xuất',
    optionNavigate: 'Login'
  },
]

const Item = ({icon, title, navigation, optionNavigate }) => (
  <TouchableOpacity onPress={() => navigation.navigate(optionNavigate)}>
    <View style={styles.item}>
      <View style={{marginRight: 20}}>
        <FontAwesome name={icon} size={20} color="black" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const Account = ({ navigation }) => {
  const user = useSelector(selectUser);
  const renderItem = ({ item }) => (
    <Item icon={item.icon} optionNavigate={item.optionNavigate} navigation={navigation} title={item.title} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <View style={{ marginVertical: 22, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <Image
          style={{ width: 70, height: 70 }}
          source={{ uri: 'http://192.168.234.1/images/logo-header.png' }}
        />
      </View>
      <FlatList
        data={user.role == 'user' ? K_OPTIONS_USER : K_OPTIONS_SELL}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}


export default Account

const styles = StyleSheet.create({
  item: {
    height: 44,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    lineHeight: 44,
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 14,
    color: '#444',
  },
})