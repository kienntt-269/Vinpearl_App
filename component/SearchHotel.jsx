import { StyleSheet,View, Text, TouchableHighlight, ScrollView, } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Button, TextInput } from '@react-native-material/core'
import { AntDesign } from '@expo/vector-icons'
import homeApi from '../api/home/home'
import { MaterialIcons } from '@expo/vector-icons';
import utils from '../utils/utils'
import DefaultStyle from '../theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SelectDropdown from 'react-native-select-dropdown'
import {Picker} from '@react-native-picker/picker';

const SearchHotel = ({ route, navigation }) => {
  const { startTime, endTime, numberAdultSelect, numberChildrenSelect } = route?.params || {};
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [siteId, setSiteId] = useState(null);
  const [listOfSite, setListOfSite] = useState([]);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  // Sử dụng biến tạm thời để lưu giá trị startTime
  const tempStartTime = startTime ? new Date(startTime) : new Date();
  
  const [startDate, setStartDate] = useState(tempStartTime);
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 2)));

  const tempNumberAdult = numberAdultSelect ? numberAdultSelect : 2;
  const tempNumberChildren = numberChildrenSelect ? numberChildrenSelect : 0;

  const [numberAdult, setNumberAdult] = useState(tempNumberAdult);
  const [numberChildren, setNumberChildren] = useState(tempNumberChildren);
  console.log(tempNumberAdult, tempNumberChildren);
  useEffect(() => {
    const getListOfSuggest = async () => {
      try {
        const res = await homeApi.getAllSite();
        let list = [];
        res.data.data.forEach(item => {
          const data = {
            label: item.name,
            value: item.id,
          }
          list.push(data);
        })
        setListOfSite(list);
      } catch(err) {
        console.log(err)
      }
    }
    getListOfSuggest();
  }, []);

  // Sử dụng useEffect để cập nhật giá trị của startDate khi startTime thay đổi
  useEffect(() => {
    if (startTime) {
      setStartDate(new Date(startTime));
    }
  }, [startTime])

  // Sử dụng useEffect để cập nhật giá trị của endDate khi endTime thay đổi
  useEffect(() => {
    if (endTime) {
      setEndDate(new Date(endTime));
    }
  }, [endTime])

  useEffect(() => {
    if (numberAdultSelect) {
      setNumberAdult(numberAdultSelect);
    }
  }, [numberAdultSelect])

  useEffect(() => {
    if (numberChildrenSelect) {
      setNumberChildren(numberChildrenSelect);
    }
  }, [numberChildrenSelect])
  return (
    <View style={styles.searchHotel}>
      <View style={{ borderWidth: 0.5, borderColor: '#CCC'}}>
        {/* <RNPickerSelect
          style={{ inputAndroid: { color: 'black' } }}
          // onValueChange={(value) => setSiteId(value)}
          placeholder={{ label: 'Lựa chọn khu vực', value: null }}
          items={listOfSite}
        /> */}
        <Picker
          selectedValue={siteId}
          onValueChange={(itemValue, itemIndex) => setSiteId(itemValue)}
        >
          {/* <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" /> */}
          {
            listOfSite.map((site, index) => (
              <Picker.Item label={site.label} value={site.value} key={index} />
            ))
          }
        </Picker>
        
      </View>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() =>
          navigation.navigate("RangePicker", {
            startDate: startDate,
            endDate: endDate,
        })}
      >
        <Text style={styles.icon}>
          <MaterialIcons name="date-range" size={24} color="#696DA4" />
        </Text>
        <View style={{flex: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30,}}>
          <View>
            <Text style={[DefaultStyle.text, styles.title]}> Nhận phòng</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[DefaultStyle.text, styles.day]}>{startDate.getDate().toString().padStart(2, '0')}</Text>
              <View>
                <Text style={{fontSize: 14, fontWeight: '500', color: '#ccc', }}>{utils.getDay(startDate.getTime())}</Text>
                <Text style={{fontSize: 14, fontWeight: '500', color: '#ccc', }}>
                  Thg {startDate.getMonth() + 1}, {Number(String(startDate.getFullYear()).slice(-2))}
                  {/* Thg 4, 23 */}
                </Text>
              </View>
            </View>
          </View>
          <AntDesign name="arrowright" size={24} color="#ccc" />
          <View>
            <Text style={[DefaultStyle.text, styles.title]}> Trả phòng</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[DefaultStyle.text, styles.day]}>{endDate.getDate().toString().padStart(2, '0')}</Text>
              <View>
                <Text style={{fontSize: 14, fontWeight: '500', color: '#ccc', }}>{utils.getDay(endDate.getTime())}</Text>
                <Text style={{fontSize: 14, fontWeight: '500', color: '#ccc', }}>
                  Thg {endDate.getMonth() + 1}, {Number(String(endDate.getFullYear()).slice(-2))}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() =>
          navigation.navigate("SelectPeople", {
            numberAdult: numberAdult,
            numberChildren: numberChildren,
        })}
      >
        <View style={styles.wrapper}>
          <Text style={styles.icon}>
            <AntDesign name="user" size={24} color="#696DA4" />
          </Text>
          <View style={{flex: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30,}}>
            <Text>
              <Text style={{color: "#E8952F", fontWeight: '500'}}>1 </Text>
              Phòng
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View>
                <Text>
                  <Text style={{color: "#E8952F", fontWeight: '500'}}>{numberAdult} </Text>
                  Người lớn
                </Text>
                <Text>
                  <Text style={{color: "#E8952F", fontWeight: '500'}}>{numberChildren} </Text>
                  Trẻ em
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Button
        onPressIn={() =>
          navigation.navigate("ResultSearchHotel", {
            checkIn: startDate.getTime(),
            checkOut: endDate.getTime(),
            siteId: siteId,
            numberAdult: numberAdult,
            numberChildren: numberChildren,
        })
      }
      uppercase={false}
      style={{position: 'absolute', bottom: 30, left: 15, width: '100%', borderRadius: 8, backgroundColor: '#E8952F', padding: 10, }}
      title="Tìm kiếm"
    />
    </View>
  )
}

export default SearchHotel

const styles = StyleSheet.create({
    searchHotel: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
      borderRadius: 4,
      flexDirection: 'column',
      height: '100%'
    },
    icon: {
      backgroundColor: 'white',
      shadowColor: 'black',
      padding: 5,
      borderColor: '#ccc',
      borderWidth: 0.25,
      marginRight: 10,
      borderRadius: 4,
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000',
    },
    day: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#E8952F",
      marginRight: 10,
    },
    wrapper: {
      zIndex: -1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.25
    },
})