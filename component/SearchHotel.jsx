import { StyleSheet,View, Text, TouchableHighlight, ScrollView, } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Button, TextInput } from '@react-native-material/core'
import { AntDesign } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker'
import homeApi from '../api/home/home'
import { MaterialIcons } from '@expo/vector-icons';
import utils from '../utils/utils'
import DefaultStyle from '../theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SearchHotel = ({ route, navigation }) => {
  // const { startTime, endTime } = route.params;
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(route.params?.startTime || new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 2)));
  const [value, setValue] = useState(null);
  const [numberAdult, setNumberAdult] = useState(2);
  const [numberChildren, setNumberChildren] = useState(0);
  const [siteId, setSiteId] = useState(null);
  const [listOfSite, setListOfSite] = useState([]);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  
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
}, [])

useEffect(() => {
  if (route.params?.startDate) {
    console.log(route.params);
    setStartDate(route.params.startDate);
  }
  if (route.params?.endDate) {
    setEndDate(route.params.endDate);
  }
}, [route.params?.startDate])
  return (
    <View style={styles.searchHotel}>
      <DropDownPicker
        open={open}
        value={value}
        items={listOfSite}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setListOfSite}
        onChangeValue={(value) => {
          setSiteId(value);
        }}
      />
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() =>
          navigation.navigate("RangePicker", {
            dataFilter: "dataFilter",
            // siteId: siteId,
            // numberPerson: numberAdult + numberChildren,
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
                  Thg {startDate.getMonth()}, {Number(String(startDate.getFullYear()).slice(-2))}
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
                  Thg {endDate.getMonth()}, {Number(String(endDate.getFullYear()).slice(-2))}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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