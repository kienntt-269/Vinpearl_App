import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Calendar from "react-native-calendar-range-picker";
import { Button } from '@react-native-material/core';
import utils from '../utils/utils';

const RangePicker1 = ({ route, navigation }) => {
  const [dayDiff, setDayDiff] = useState(2);
  const [rangeDate, setRangeDate] = useState([]);
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Calendar
          locale={utils.CUSTOM_LOCALE}
          startDate="2023-03-28"
          endDate="2023-06-31"
          onChange={({ startDate, endDate }) => {
            const numberDay = new Date(endDate).getTime() - new Date(startDate).getTime();
            if (numberDay > 0) {
              setRangeDate([new Date(startDate), new Date(endDate)])
              setDayDiff(Math.round(numberDay / 86400000));
            } else {
              setDayDiff(2);
            }
          }}
        />
      </ScrollView>
      <Button
        onPress={() =>
            navigation.navigate("MyOrder", {
              startTime: new Date(rangeDate[0]),
              endTime: new Date(rangeDate[1]),
            })
        }
        title={`Xác nhận ${dayDiff} đêm`}
        uppercase={false}
        style={{position: 'absolute', bottom: 15, left: 15, right: 15, borderRadius: 8, backgroundColor: '#E8952F', padding: 10, }}
      />
    </View>
  )
}

export default RangePicker1

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})