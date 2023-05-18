import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import customerApi from '../api/depost/customerApi';

const Cart = () => {
  const user = useSelector(selectUser);
  const cart = useSelector(state => state.cart);
    
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
  }, [user.email,currentId, render]);

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Tour A', image: 'http://192.168.1.11:8080/images/home/banner.png', price: 50 },
    { id: 2, name: 'Tour B', image: 'http://192.168.1.11:8080/images/home/banner.png', price: 70 },
    { id: 3, name: 'Tour C', image: 'http://192.168.1.11:8080/images/home/banner.png', price: 80 },
  ]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: 'http://192.168.1.11:8080/images/home/banner.png' }}
        style={styles.image} 
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} USD</Text>
      </View>
    </View>
  );

  return (
    <View>
      {/* {cart.map(item => (
        <View key={item.id}>
          <Text>{item.name}</Text>
        </View>
      ))} */}
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>There are no tours in your cart.</Text>}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>{totalPrice} USD</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
  },
  totalPrice: {
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})