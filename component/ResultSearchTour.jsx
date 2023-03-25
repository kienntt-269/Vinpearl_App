import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, FlatList, } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { TextInput } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons'; 
import homeApi from '../api/home/home';
import Price from '../utils/Price';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

const ResultSearchTour = ({ route, navigation }) => {
    /* 2. Get the param */
    const { itemId } = route.params;
    const { nameParam } = route.params;
    const [listOfTour, setListOfTour] = useState([])
    useEffect(() => {
      const getListOfTour = async () => {
        try {
          const data = {
            siteId: itemId,
            page: 0,
            size: 5,
            sort: 'id,desc',
          }
            const res = await homeApi.searchTour(data);
            console.log(res.data.data);
            setListOfTour(res.data.data.content);
        } catch(err) {
            console.log(err)
        }
      }
      getListOfTour();
    }, [])
  return (
    <ScrollView style={styles.resultSearchTour}>
        <TextInput
          placeholder="Tìm điểm đến hoặc hoạt động"
          leading={() => <AntDesign name="search1" size={24} color="#E3AD46" />}
          value={nameParam || ""}
        />
        <View style={styles.resultHeader}>
          <Text style={styles.filter}>
            Có
            <Text style={styles.number}>7</Text>
            kết quả tìm kiếm</Text>
          <View style={styles.filter}>
            <Text>Bộ lọc và sắp xếp</Text>
            <AntDesign name="filter" size={24} color="#8C8C90" />
          </View>
        </View>
        <View>
          {
            listOfTour ? listOfTour.map((item, index) => {
              <TouchableOpacity
                  key={index}
                  style={styles.itemWrapper}
                  onPress={() => navigation.navigate('TourDetail', {
                      itemId: item.id,
                      name: item.name,
                  })}
              >
                  <Image 
                      style={{width: '100%', height: 180, width: '100%', borderRadius: 8}}
                      source={{uri: item.path}}
                  />
                  <View style={styles.description}>
                    <Text numberOfLines={2} style={styles.nameTour}>
                      {item.name}
                    </Text>
                    <FlatList
                      horizontal={true}
                      data={['Trả góp 0%', 'Nghỉ lẽ 30/4', 'Mayfest Combo', '3N2Đ']}
                      renderItem={({item, index}) => {
                        <View>
                          <Text style={index == 0 || index == 3 ? styles.installment : styles.holiday}>
                            {item}
                          </Text>
                        </View>
                      }}
                      keyExtractor={(item) => item.id}
                    />
                    <View style={styles.boxBottom}>
                      <View>
                        <View>
                          <FontAwesome5 name="history" size={24} color="black" />
                          <Text style={styles.filter}>3 ngày 2 đêm</Text>
                        </View>
                        <View>
                          <Feather name="shopping-bag" size={24} color="black" />
                          <Text style={styles.filter}>
                            3 người đã mua
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.filter}>
                        Chỉ từ
                        <Price value={item.priceMin}/>
                      </Text>
                    </View>
                  </View>
              </TouchableOpacity>
            }) : null
          }
        </View>

    </ScrollView>
  )
}

export default ResultSearchTour

const styles = StyleSheet.create({
    resultSearchTour: {
      margin: 25,
      width: '100%',
    },
    resultHeader: {

    },
    number: {
      color: "#ccc",
    },
    filter: {
      fontSize: 11,
      fontWeight: '500',
      color: "#8C8C90",
    },
    itemWrapper: {
      width: 150,
      paddingRight: 15,
      borderRadius: 12,
      shadowColor: 'black',
      backgroundColor: 'white',
    },
    description: {
      paddingHorizontal: 25,
      paddingVertical: 15,
      backgroundColor: "#FFF",
    },
    nameTour: {
      marginBottom: 10,
      fontSize: 16,
      fontWeight: '600',
      
    },
    price: {

    },
    name: {
      position: 'absolute',
      bottom: 15,
      color: '#FFF',
      fontSize: 16,
      fontWeight: '500',
    },
    installment: {
      fontSize: 12,
      color: "#FFF",
      fontWeight: 400,
      borderRadius: 16,
      backgroundColor: '#69ADF4',
    },
    holiday: {
      fontSize: 12,
      color: "#FFF",
      fontWeight: 400,
      borderRadius: 16,
      backgroundColor: '#FC8D47',
    },
    boxBottom: {

    },
})