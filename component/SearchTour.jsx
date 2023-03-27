import { StyleSheet, ScrollView, View, Text, TouchableHighlight, FlatList, TouchableOpacity, Image, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from "@react-native-material/core";
import Banner from './Banner'
import { AntDesign } from '@expo/vector-icons'; 
import homeApi from '../api/home/home';
import Price from '../utils/Price';
import DefaultStyle from '../theme';

const SearchTour = ({navigation}) => {
    const [listOfSuggest, setListOfSuggest] = useState([])

    useEffect(() => {
        const getListOfSuggest = async () => {
          try {
            const data = {
              siteId: 2,
              page: 0,
              size: 5,
              sort: 'id,desc',
            }
              const res = await homeApi.searchTour(data);
              setListOfSuggest(res.data.data.content);
          } catch(err) {
              console.log(err)
          }
        }
        getListOfSuggest();
    }, [])

    const listTypeOfTour = [
        {
            id: 1,
            icon: <AntDesign name="rest" size={24} color="#E3AD46" />,
            name: "Gói nghỉ dưỡng",
        },
        {
            id: 2,
            icon: <AntDesign name="rest" size={24} color="#E3AD46" />,
            name: "VinWonders",
        },
        {
            id: 3,
            icon: <AntDesign name="rest" size={24} color="#E3AD46" />,
            name: "Vận chuyển",
        },
        {
            id: 4,
            icon: <AntDesign name="rest" size={24} color="#E3AD46" />,
            name: "Vinpearl Golf",
        },
        {
            id: 5,
            icon: <AntDesign name="rest" size={24} color="#E3AD46" />,
            name: "Ẩm thực",
        },
        {
            id: 6,
            icon: <AntDesign name="rest" size={24} color="#E3AD46" />,
            name: "Tour",
        },
        {
            id: 7,
            icon: <AntDesign name="rest" size={24} color="#E3AD46" />,
            name: "Vé tham quan",
        },
        {
            id: 8,
            icon: <AntDesign name="rest" size={24} color="#E3AD46" />,
            name: "Spa",
        },
    ]

    const listOfSite = [
        {
            id: 2,
            name: "Phú Quốc",
            path: "http://192.168.1.6:8080/home/phuquoc.png",
        },
        {
            id: 3,
            name: "Đà Nẵng",
            path: "http://192.168.1.6:8080/home/danang.png",
        },
        {
            id: 1,
            name: "Nha Trang",
            path: "http://192.168.1.6:8080/home/nhatrang.png",
        },
        {
            id: 4,
            name: "Hội An",
            path: "http://192.168.1.6:8080/home/hoian.png",
        },
    ]

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemWrapperSite}
            onPress={() => navigation.navigate('ResultSearchTour', {
                itemId: item.id,
                name: item.name,
            })}
        >
            <Image 
                style={{width: '100%', height: 182}}
                source={{uri: item.path}}
            />
            <Text style={[DefaultStyle.text, styles.nameSite]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderItemSuggest = ({ item }) => (
        <TouchableOpacity
            style={styles.itemWrapperSuggest}
            onPress={() => navigation.navigate('TourDetail', {
                itemId: item.id,
                name: item.name,
            })}
        >
            <Image 
                style={{width: '100%', height: 192, width: 162, borderRadius: 12}}
                source={{uri: item.path}}
            />
            <View>
              <Text numberOfLines={2} style={[DefaultStyle.text, styles.namePost]}>
                {item.name}
              </Text>
              <Text style={[DefaultStyle.text, styles.price]}>
                <Price value={item.priceMin}/>
              </Text>
            </View>
        </TouchableOpacity>
      );
  return (
    <ScrollView style={styles.searchTour}>
        <Banner/>
        <View style={styles.container}>
            <TextInput
                style={DefaultStyle.text}
                placeholder="Tìm điểm đến hoặc hoạt động"
                leading={() => <AntDesign name="search1" size={24} color="#E3AD46" />}
            />
            <View style={styles.homeSelect}>
                {
                    listTypeOfTour ? listTypeOfTour.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text>{item.name}</Text>
                            <TouchableHighlight
                                onPress={() => navigation.navigate('ResultSearchTour', {
                                    id: item.id,
                                    name: item.name,
                                })}
                                style={styles.wrapper}
                            >
                                <Text style={styles.name}>
                                    {item.icon}
                                    <Text>
                                        {item.name}
                                    </Text>
                                </Text>
                            </TouchableHighlight>
                        </View>
                    )) : null
                }
            </View>
            <View style={[DefaultStyle.text, styles.site]}>
                <Text style={[DefaultStyle.text, styles.title]}>Điểm đến yêu thích</Text>
                <FlatList
                    horizontal={true}
                    data={listOfSite}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.suggest}>
                <Text style={[DefaultStyle.text, styles.title]}>Sản phẩm dành cho bạn</Text>
                <FlatList
                    horizontal={true}
                    data={listOfSuggest}
                    renderItem={renderItemSuggest}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    </ScrollView>
  )
}

export default SearchTour

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,

    },
    searchTour: {

    },
    homeSelect: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',

    },
    item: {
        width: '25%',
    },
    iconName: {
        width: '100%',
        shadowColor: '#E3AD46',
        borderWidth: 1,
        borderColor: "#ccc",
        flex: 1,
    },
    wrapper: {
    },
    site: {

    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        lineHeight: 28,
        marginVertical: 12,
    },
    itemWrapperSuggest: {
        position: 'relative',
        width: 150,
        paddingRight: 15,
        marginRight: 30,
    },
    itemWrapperSite: {
        position: 'relative',
        width: 150,
        paddingRight: 15,
    },
    name: {
        flexDirection: 'column',
    },
    nameSite: {
        position: 'absolute',
        bottom: 15,
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        width: '100%',
        textAlign: 'center',
    },
})