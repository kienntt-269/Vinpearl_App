import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import ButtonLink from './ButtonLink';
import homeApi from '../api/home/home';
import Price from '../utils/Price';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const TourDetail = ({ route, navigation }) => {
    /* 2. Get the param */
    const { itemId } = route.params;
    const { nameParam } = route.params;

    const [tourDetail, setTourDetail] = useState({});
    useEffect(() => {
        const getListOfSuggest = async () => {
          try {
              const res = await homeApi.getTourDetail(itemId);
              setTourDetail(res.data[0].tour);
          } catch(err) {
              console.log(err)
          }
        }
        getListOfSuggest();
      }, [])

    return (
        <ScrollView style={styles.TourDetail}>
            <Image 
                style={{width: '100%', height: 224, width: '100%', borderRadius: 8}}
                source={{uri: 'http://192.168.1.12:8080/home/banner.png'}}
            />
            <Text style={styles.title}>HCM - Phú quốc Mayfest Combo</Text>
            <View style={styles.code}>
                <Text>Mã sản phẩm</Text>
                <Text>GN00666</Text>
            </View>
            <View style={styles.price}>
                <Text>Chỉ từ</Text>
                <View style={styles.price}>
                    <Price value="5000000"/>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>
                    <MaterialIcons name="attach-money" size={24} color="yellow" />
                    Giá luôn tốt nhất
                </Text>
                <Text style={styles.descriptionText}>
                    <AntDesign name="like2" size={24} color="yellow" />
                    Không phí thanh toán
                </Text>
                <Text style={styles.descriptionText}>
                    <MaterialCommunityIcons name="update" size={24} color="yellow" />
                    Xác nhận tức thì
                </Text>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>
                    <AntDesign name="check" size={24} color="yellow" />
                    02 đêm phòng
                </Text>
                <Text style={styles.descriptionText}>
                    <AntDesign name="check" size={24} color="yellow" />
                    Ăn sáng mỗi ngày
                </Text>
            </View>
        </ScrollView>
    )
}

export default TourDetail

const styles = StyleSheet.create({
    TourDetail: {

    },
    title: {
    
    },
    code: {
    
    },
    price: {
    
    },
    price: {
    
    },
    description: {
        paddingVertical: 20,
        borderColor: '#CCC',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '500',
    },

})
