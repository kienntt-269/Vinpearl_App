import { StyleSheet, ScrollView, View, Text, ImageBackground} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
const banner = {uri: 'http://192.168.1.12:8080/home/banner.png'};

const Banner = () => {
    const user = useSelector(selectUser);

  return (
    <ScrollView style={styles.banner}>
        <View style={styles.header}>
          <ImageBackground source={banner} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>Xin chào, {user.fullName}</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingTop: 40,
        width: '100%',
        paddingLeft: 5,
    },
})