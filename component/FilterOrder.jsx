import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import homeApi from '../api/home/home'
import DefaultStyle from '../theme';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import utils from '../utils/utils';
import Price from '../utils/Price';
import { Picker } from '@react-native-picker/picker';
const FilterOrder = () => {
    const user = useSelector(selectUser);
    const route = useRoute();
    const navigation = useNavigation();
    const data = route.params?.data;
    const [typeOfServiceId, setTypeOfServiceId] = useState(1);
    const [statusId, setStatusId] = useState(1);
    const [indexTime, setIndexTime] = useState(null);
    const [indexService, setIndexService] = useState(1);
    const [indexStatus, setIndexStatus] = useState(null);
    const [listOfService, setListOfService] = useState([
        {
            id: 1,
            name: 'Khách sạn & Nghỉ dưỡng',
        },
        {
            id: 2,
            name: 'Vé máy bay',
        },
        {
            id: 3,
            name: 'Tour & Trải nghiệm',
        },
    ]);
    const [listOfStatus, setListOfStatus] = useState([
        {
            id: 0,
            name: 'Đã hủy',
        },
        {
            id: 1,
            name: 'Thành công',
        },
        {
            id: 2,
            name: 'Không thành công',
        },
        {
            id: 3,
            name: 'Đã hoàn',
        },
        {
            id: 4,
            name: 'Chờ xử lý',
        },
    ]);
    const listOfTime = [
        {
            id: 0,
            name: '0 - 6 tháng trước',
        },
        {
            id: 1,
            name: '6 - 12 tháng trước',
        },
        {
            id: 2,
            name: 'Trên 12 tháng trước',
        },
    ]
  return (
    <View>
      <View style={styles.filter}>
            {/* <TextInput
                placeholder="Mã đơn hàng"
                leading={() => <AntDesign name="search1" size={24} color="#E3AD46" />}
            /> */}
            <ScrollView>
                <View style={styles.itemWrapper}>
                    <AntDesign style={{position: 'absolute', left: 10, top: 12,}} name="search1" size={24} color="black" />
                    <TextInput
                    onChangeText={(value) => {
                        console.log(value);
                    }}
                    placeholder="Nhập mã đơn hàng"
                    style={[styles.input]}
                    />
                </View>
                <View style={styles.itemWrapper}>
                    <Text style={[DefaultStyle.text, styles.label]}>Thời gian hoàn tất đơn</Text>
                    <FlatList
                        data={listOfTime}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={indexTime == item.id ? styles.timeWrapperActive : styles.timeWrapper}
                                onPress={() => setIndexTime(item.id)}
                                key={item.id}
                            >
                            <Text style={indexTime == item.id ? styles.itemTextActive : styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                    />
                </View>
                <View style={styles.itemWrapper}>
                    <Text style={[DefaultStyle.text, styles.label]}>Trạng thái</Text>
                    <FlatList
                        data={listOfStatus}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={indexStatus == item.id ? styles.timeWrapperActive : styles.timeWrapper}
                                onPress={() => setIndexStatus(item.id)}
                                key={item.id}
                            >
                            <Text style={indexStatus == item.id ? styles.itemTextActive : styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                    />
                </View>
                <View style={styles.itemWrapper}>
                    <Text style={[DefaultStyle.text, styles.label]}>Danh mục</Text>
                    <FlatList
                        data={listOfService}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={indexService == item.id ? styles.timeWrapperActive : styles.timeWrapper}
                                onPress={() => setIndexService(item.id)}
                                key={item.id}
                            >
                            <Text style={indexService == item.id ? styles.itemTextActive : styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                    />
                </View>
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 15, borderTopColor: '#CCC', borderTopWidth: 0.25, position: 'absolute', bottom: 20, paddingVertical: 20, paddingHorizontal: 20}}>
                <Text style={[DefaultStyle.text, styles.clear]}>Xóa lọc</Text>
                <Text
                    style={[DefaultStyle.text, styles.btnFilter]}
                    onPress={() => navigation.navigate('Đơn hàng', {
                        time: indexTime,
                        serviceId: indexService,
                        sTatusId: indexStatus,
                    })}
                >Lọc kết quả</Text>
            </View>
        </View>
    </View>
  )
}

export default FilterOrder

const styles = StyleSheet.create({
    filter: {
        marginTop: 15,
        backgroundColor: '#FFF',
        height: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        marginBottom: 10,
        height: 50,
        borderRadius: 30,
        paddingLeft: 40,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    itemWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: '#f9c2ff',
    },
    timeWrapperActive: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: '#FFF4E4',
        paddingVertical: 10,
        borderRadius: 20,
        width: '48%',
        marginRight: 10,
    },
    timeWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: '#F4F4F4',
        paddingVertical: 10,
        borderRadius: 20,
        width: '48%',
        marginRight: 10,
    },
    itemWrapper: {
        // flex: 1,
        margin: 10,
      },
      itemText: {
        fontSize: 13,
      },
      itemTextActive: {
        fontSize: 13,
        color: '#E8952F',
      },
      clear: {
        fontSize: 15,
        fontWeight: '500',
        color: '#E8952F',
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderColor: "#E8952F",
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    btnFilter: {
        backgroundColor: '#E8952F',
        color: '#FFF',
        borderWidth: 1,
        borderColor: "#E8952F",
        borderRadius: 8,
        paddingHorizontal: 40,
        paddingVertical: 10,
    }
})