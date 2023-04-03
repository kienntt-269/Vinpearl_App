import { StyleSheet, ScrollView, View, Text, ImageBackground, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import DefaultStyle from '../theme';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const banner = {uri: 'http://192.168.1.6:8080/home/banner.png'};

const Banner = () => {
    const user = useSelector(selectUser);
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.banner}>
        <View style={styles.header}>
          <ImageBackground source={banner} resizeMode="cover" style={styles.image}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Trang chủ')}
                >
                  <MaterialCommunityIcons name="chevron-left-circle-outline" size={24} color="#FFF" />
                </TouchableOpacity>
                <View>
                  <Text style={[DefaultStyle.text, styles.text]}>
                    <Text>Xin chào, </Text>
                    <Text style={{textTransform: 'uppercase'}}>
                      {user.fullName}
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <AntDesign name="shoppingcart" size={20} color="#FFF" />
              </View>
            </View>
          </ImageBackground>
        </View>
    </ScrollView>
  )
}

export default Banner

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        height: 100,
        width: '100%',
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 5,
        marginLeft: 20,
    },
})