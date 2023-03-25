import react from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Auth = () => {
  const user = useSelector(selectUser);
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
        component={TransactionHistory}
        options={{headerShown: false}}
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
              options={{
                title: 'Đăng ký', //Set Header Title
                headerStyle: {
                  backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='Auth'
              component={Auth}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name='SearchTour'
              component={SearchTour}
              options={{
                title: 'Tìm kiếm tour', //Set Header Title
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
                  fontWeight: '400', //Set Header text style
                },
                headerTitleAlign: "center",
                headerTitleAlign: "center",
                headerBackground: () => {
                    <Image
                      source={{ uri: 'http://192.168.1.12:8080/home/banner.png' }}
                    />
                }
              }}
            />
            <Stack.Screen 
              name='SearchHotel'
              component={SearchHotel}
              options={{
                title: 'Tìm kiếm khách sạn', //Set Header Title
                headerStyle: {
                  backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
              }}
            />
            <Stack.Screen 
              name='ResultSearchHotel'
              component={ResultSearchHotel}
              options={{
                title: 'Tìm kiếm', //Set Header Title
                headerStyle: {
                  backgroundColor: '#FFF', //Set Header color
                },
                headerTintColor: '#000', //Set Header text color
                headerTitleStyle: {
                  fontWeight: '400', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='ResultSearchTour'
              component={ResultSearchTour}
              options={{
                title: 'Tìm kiếm', //Set Header Title
                headerStyle: {
                  backgroundColor: '#FFF', //Set Header color
                },
                headerTintColor: '#000', //Set Header text color
                headerTitleStyle: {
                  fontWeight: '400', //Set Header text style
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
                  backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
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
                  backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
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
                  backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
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
                  backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen 
              name='TourDetail'
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
                  backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
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