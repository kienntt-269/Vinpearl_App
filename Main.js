import react from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import store from './redux/store';
import { Provider } from 'react-redux';
//icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'

import Home from './screens/Home';
import Account from './screens/Account';

import SignIn from './screens/SignIn'
import Login from './screens/Login'
import PersonalInfo from './component/PersonalInfo';
import TransactionHistory from './component/TransactionHistory';
import Cart from './component/Cart';
import TourDetail from './component/TourDetail';
import OrderInfor from './component/OrderInfor';
import OrderInforUser from './component/OrderInforUser';
import OrderManagement from './component/OrderManagement';
import userSlice from './redux/user/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/user/userSlice';
import SearchTour from './component/SearchTour';
import SearchHotel from './component/SearchHotel';
import ResultSearchHotel from './component/ResultSearchHotel';
import ResultSearchTour from './component/ResultSearchTour';
import { Image } from 'react-native';
import PostDetail from './component/PostDetail';
import OptionFilter from './component/OptionFilter';
import RangePicker from './component/RangePicker';
import HotelDetail from './component/HotelDetail';
import SummaryHotel from './component/SummaryHotel';
import FormBooking from './component/FormBooking';
import ConfirmBooking from './component/ConfirmBooking';
import PaymentBooking from './component/PaymentBooking';
import MyOrder from './screens/MyOrder';
import { AntDesign } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import SelectPeople from './component/SelectPeople';
import FilterOrder from './component/FilterOrder';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Auth = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Auth"
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Trang chủ') {
              iconName = focused
              ? 'house-user'
              : 'house-user';
          } else if (route.name === 'Tài khoản') {
              iconName = focused ? 'user-alt' : 'user-alt';
          } else if (route.name === 'Đơn hàng') {
            iconName = focused ? 'jedi-order' : 'jedi-order';
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          // tabBarActiveTintColor: 'tomato',
          // tabBarInactiveTintColor: 'gray',
      })}
    >
    <Tab.Screen
        name="Trang chủ"
        component={Home}
        options={{headerShown: false}}
    />
    <Tab.Screen
        name="Đơn hàng"
        component={MyOrder}
        options={{
          title: 'Đơn hàng của tôi', //Set Header Title
          headerStyle: {
            flex: 1,
            justifyContent: 'center',
            height: 100,
            width: '100%',
            flexDirection: 'row',
            backgroundColor: "#FFF",
          },
          headerTintColor: '#2B2F34', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <View
              style={{ marginRight: 10 }}
            >
                <AntDesign onPress={() => navigation.navigate("FilterOrder")} name="menu-fold" size={24} color="black" />
            </View>
          )
        }}
    />
    <Tab.Screen
        name="Tài khoản"
        component={Account}
        options={{headerShown: false}}
    />
  </Tab.Navigator>
  )
}

const Main = () => {
  const cartItems = useSelector(state => state.cart);
    return (
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName="Login"
            initialRouteName="Auth"
          >
            <Stack.Screen
              name='Login'
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name='SignIn'
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name='Auth'
              component={Auth}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name='SearchTour'
              component={SearchTour}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name='SearchHotel'
              component={SearchHotel}
              options={{
                title: 'Tìm khách sạn', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='SelectPeople'
              component={SelectPeople}
              options={{
                title: 'Chọn số lượng người', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='FilterOrder'
              component={FilterOrder}
              options={{
                title: 'Bộ lọc', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='SummaryHotel'
              component={SummaryHotel}
              options={{
                title: 'Tổng kết hành trình', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#000', //Set Header text color
                headerTitleStyle: {
                  fontWeight: '500', //Set Header text style
                },
                headerTitleAlign: "center",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='RangePicker'
              component={RangePicker}
              options={{
                title: 'Chọn ngày', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='OptionFilter'
              component={OptionFilter}
              options={{
                title: 'Bộ lọc & Sắp xếp', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='ResultSearchHotel'
              component={ResultSearchHotel}
              options={{
                title: 'Danh sách khách sạn', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='HotelDetail'
              component={HotelDetail}
              options={{
                title: 'Danh sách phòng', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='ResultSearchTour'
              component={ResultSearchTour}
              options={{
                title: 'Danh sách tour', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='PersonalInfo'
              component={PersonalInfo}
              options={{
                title: 'Thông tin cá nhân', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='PostDetail'
              component={PostDetail}
              options={{
                title: 'Chi tiết bài viết', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='FormBooking'
              component={FormBooking}
              options={{
                title: 'Thông tin người đặt', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='PaymentBooking'
              component={PaymentBooking}
              options={{
                title: 'Hoàn tất đặt phòng', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='ConfirmBooking'
              component={ConfirmBooking}
              options={{
                title: 'Xác nhận', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='TransactionHistory'
              component={TransactionHistory}
              options={{
                title: 'Lịch sử giao dịch', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='Cart'
              component={Cart}
              options={{
                title: 'Giỏ hàng', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='Thông tin chi tiết tour'
              component={TourDetail}
              options={({route}) => (
                {
                  title: route.params.nameParam, //Set Header Title
                  headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                  },
                  headerTintColor: '#fff', //Set Header text color
                  headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                  },
                  headerTitleAlign: "center",
                  // headerRight: () => (
                  //   <View style={{ marginRight: 10 }}>
                  //     <AntDesign name="shoppingcart" size={28} color="#FFF" />
                  //     {cartItems.length > 0 && (
                  //       <View
                  //         style={{
                  //           position: 'absolute',
                  //           backgroundColor: '#E8952F',
                  //           width: 20,
                  //           height: 20,
                  //           borderRadius: '50%',
                  //           top: -6,
                  //           right: -5,
                  //           justifyContent: 'center',
                  //           alignItems: 'center',
                  //         }}
                  //       >
                  //         <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  //           {cartItems.length}
                  //         </Text>
                  //       </View>
                  //     )}
                  //   </View>
                  // )
                }
              )}
            />
            <Stack.Screen 
              name='OrderInfor'
              component={OrderInfor}
              options={({route}) => (
                {
                  title: 'Thông tin đặt hàng', //Set Header Title
                  headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                  },
                  headerTintColor: '#fff', //Set Header text color
                  headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                  },
                  headerTitleAlign: "center",
                }
              )}
            />
            <Stack.Screen 
              name='OrderInforUser'
              component={OrderInforUser}
              options={({route}) => (
                {
                  title: 'Thông tin đặt hàng', //Set Header Title
                  headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                  },
                  headerTintColor: '#fff', //Set Header text color
                  headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                  },
                  headerTitleAlign: "center",
                }
              )}
            />
            <Stack.Screen 
              name='OrderManagement'
              component={OrderManagement}
              options={{
                title: 'Đơn hàng mới', //Set Header Title
                headerStyle: {
                  flex: 1,
                  justifyContent: 'center',
                  height: 100,
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: "#FFF",
                },
                headerTintColor: '#2B2F34', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main

const styles = StyleSheet.create({})