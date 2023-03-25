import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';

const PersonalInfo = () => {
  const user = useSelector(selectUser)
  return (
    <View style={{backgroundColor: '#fff', paddingTop: 20, height: '100%'}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center" , marginHorizontal: 20, marginVertical: 20}}>
          <FontAwesome name="user-circle" size={45} color="#ccc" />
          <View style={{marginHorizontal: 15}}>
            <Text style={{color: '#707070', fontSize: 14}}>Xin chào,</Text>
            <Text style={{fontSize: 14}}>{user.username}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", }}>
          <Text style={{color: '#1a1a1a', fontWeight: '700',fontSize: 16, marginHorizontal: 9}}>Thông tin cá nhân</Text>
          <Text style={{color: '#2998dd', fontSize: 12, fontWeight: '600'}}>Chỉnh sửa thông tin</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.titleCard}>Họ và tên</Text>
            <Text style={styles.valueCard}>{user.username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleCard}>Email</Text>
            <Text style={styles.valueCard}>{user.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleCard}>Số điện thoại</Text>
            <Text style={styles.valueCard}>{user.phone}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PersonalInfo

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginHorizontal: 'auto',
    width: '100%',
  },
  body: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e4e4e4'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleCard: {
    fontSize: 13,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#1a1a1a',
    lineHeight: 16,
    paddingHorizontal: 15,
    flexBasis: '33.33333%'
  },
  valueCard: {
    paddingHorizontal: 15,
    flexBasis: '66.66667%'
  }
})