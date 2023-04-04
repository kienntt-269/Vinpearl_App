import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, FlatList, } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { TextInput } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons'; 
import homeApi from '../api/home/home';
import Price from '../utils/Price';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import DefaultStyle from '../theme';

const ResultSearchTour = ({ route, navigation }) => {
    /* 2. Get the param */
    const { itemId, typeOfTourId } = route.params;
    const { nameParam } = route.params;
    const [listOfTour, setListOfTour] = useState([])
    const [totalTour, setTotalTour] = useState(0)
    useEffect(() => {
      const getListOfTour = async () => {
        try {
          const data = {
            siteId: itemId ? itemId : "",
            page: 0,
            size: 5,
            sort: 'id,desc',
            typeOfTourIds: typeOfTourId ? typeOfTourId : "",
          }
            const res = await homeApi.searchTour(data);
            console.log(res.data.data);
            setListOfTour(res.data.data.content);
            setTotalTour(res.data.data.totalElements);
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
          <View style={[DefaultStyle.text, styles.filter]}>
            <Text style={styles.number1}>Có</Text>
            <Text style={styles.number}>{totalTour}</Text>
            <Text style={styles.number1}>kết quả tìm kiếm</Text>
          </View>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => navigation.navigate('OptionFilter')}
          >
            <Text style={[DefaultStyle.text, styles.number1]}>Bộ lọc và sắp xếp</Text>
            <AntDesign style={styles.filter} name="filter" size={20} color="#8C8C90" />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 100, }}>
          {
            listOfTour ? listOfTour.map((item, index) => (
              <TouchableOpacity
                  key={index}
                  style={styles.itemWrapper}
                  onPress={() => navigation.navigate('Thông tin chi tiết tour', {
                      itemId: item.id,
                      name: item.name,
                  })}
              >
                  <Image 
                      style={{width: '100%', height: 170, width: '100%', borderRadius: 14}}
                      source={{uri: item.path}}
                  />
                  <View style={styles.description}>
                    <Text numberOfLines={1} style={[DefaultStyle.text, styles.nameTour]}>
                      {item.name}
                    </Text>
                    <FlatList
                      horizontal={true}
                      data={['Trả góp 0%', 'Nghỉ lẽ 30/4', 'Mayfest Combo', '3N2Đ']}
                      renderItem={({item, index}) => (
                        <View style={{marginRight: 4}}>
                          <Text style={[DefaultStyle.text, index == 0 || index == 3 ? styles.installment : styles.holiday]}>
                            {item}
                          </Text>
                        </View>
                      )}
                      keyExtractor={(item) => item.id}
                    />
                    <View style={styles.boxBottom}>
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}}>
                        <FontAwesome5 style={{marginRight: 5}} name="history" size={10} color="#B0B2B4" />
                        {
                          item.lengthStayId == 1 ? <Text style={[DefaultStyle.text, styles.filter]}>1 ngày</Text> : null
                        }
                        {
                          item.lengthStayId == 2 ? <Text style={[DefaultStyle.text, styles.filter]}>2 ngày 1 đêm</Text> : null
                        }
                        {
                          item.lengthStayId == 3 ? <Text style={[DefaultStyle.text, styles.filter]}>3 ngày 2 đêm</Text> : null
                        }
                        {
                          item.lengthStayId == 4 ? <Text style={[DefaultStyle.text, styles.filter]}>4 ngày 3 đêm</Text> : null
                        }
                        {
                          item.lengthStayId == 5 ? <Text style={[DefaultStyle.text, styles.filter]}>5 ngày 4 đêm</Text> : null
                        }
                        {
                          item.lengthStayId == 6 ? <Text style={[DefaultStyle.text, styles.filter]}>6 ngày 4 đêm</Text> : null
                        }
                        {
                          item.lengthStayId == 7 ? <Text style={[DefaultStyle.text, styles.filter]}>6 ngày 5 đêm</Text> : null
                        }
                        {
                          item.lengthStayId == 8 ? <Text style={[DefaultStyle.text, styles.filter]}>22 ngày 21 đêm</Text> : null
                        }
                      </View>
                      <View style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start'}}>
                          <Feather style={{marginRight: 5}} name="shopping-bag" size={12} color="#B0B2B4" />
                          <Text style={[DefaultStyle.text, styles.filter]}>
                            {item.numberOfPeople - item.remainingOfPeople} người đã mua
                          </Text>
                        </View>
                        <Text style={[DefaultStyle.text, styles.filter]}>
                          <Text>Chỉ từ  </Text>
                          <Text style={{marginLeft: 6}}>
                            <Price active={true} value={item.priceMin}/>
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
              </TouchableOpacity>
            )) : null
          }
        </View>

    </ScrollView>
  )
}

export default ResultSearchTour

const styles = StyleSheet.create({
    resultSearchTour: {
      flex: 1,
      padding: 25,
      backgroundColor: '#F6F6F6',
    },
    resultHeader: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    number1: {
      fontSize: 12,
      fontWeight: '700',
      color: "#8C8C90",
    },
    number: {
      color: "#E8952F",
      paddingHorizontal: 4,
    },
    filter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      color: "#B0B2B4",
      fontWeight: '700',
    },
    itemWrapper: {
      borderRadius: 12,
      shadowColor: 'black',
      backgroundColor: 'white',
    },
    description: {
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: "#FFF",
    },
    nameTour: {
      marginVertical: 10,
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
      paddingHorizontal: 8,
    },
    holiday: {
      fontSize: 12,
      color: "#FFF",
      fontWeight: 400,
      borderRadius: 16,
      backgroundColor: '#FC8D47',
      paddingHorizontal: 8,
    },
    boxBottom: {

    },
})