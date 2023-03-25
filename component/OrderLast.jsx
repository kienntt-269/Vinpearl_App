import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import TextInput from '../component/TextInput'
import { COLORS, FONTS } from '../constants/theme'
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import customerApi from '../api/depost/customerApi'

const OrderLast = (props) => {

  const user = useSelector(selectUser)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [cccd, setCccd] = useState('')
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState('')
  const [value, setValue] = useState(0);
  const [created_by, setCreated_by] = useState('')
  const [showroom, setShowroom] = useState()

  const onSubmit = async () => {
    const data = {
      created_date: 'created_date',
      status: 'pending',
      product_id: props.product_id,
      user_id: user.user_id,
      phone: phone,
      cccd: cccd,
      province: province,
      created_by: created_by,
    }
    console.log(data)

    try {
      const res = await customerApi.create(data)
      alert("Thêm thành công")
      console.log(res)
    } catch (err) {
      alert(err)
      console.log(err)
    }
  }

  return (
    <View style={styles.orderLast}>
      <View onSubmit={onSubmit} style={styles.vfForm}>
        <View style={styles.groupCustomer}>
          <Text style={styles.title}>THÔNG TIN KHÁCH HÀNG</Text>
          <View style={styles.groupPersonal}>
            <Text style={styles.label}>
              Họ tên cá nhân
              <Text style={{ color: COLORS.blue }}> * </Text>
            </Text>
            <TextInput
              autoCapitalize='none'
              keyboardAppearance='dark'
              returnKeyType='next'
              returnKeyLabel='next'
              value={user.username}
              onChangeText={(value) => {
                setUserName(value)
              }}
            />
          </View>
          <View style={styles.groupPersonal}>
            <Text style={styles.label}>
              CMND/CCCD
              <Text style={{ color: COLORS.blue }}> * </Text>
            </Text>
            <TextInput
              autoCapitalize='none'
              keyboardAppearance='dark'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={(value) => {
                setCccd(value)
              }}
            />
          </View>
          <View style={styles.groupPersonal}>
            <Text style={styles.label}>
              Số điện thoại
              <Text style={{ color: COLORS.blue }}> * </Text>
            </Text>
            <TextInput
              autoCapitalize='none'
              keyboardAppearance='dark'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={(value) => {
                setPhone(value)
              }}
            />
          </View>
          <View style={styles.groupPersonal}>
            <Text style={styles.label}>
              Email
              <Text style={{ color: COLORS.blue }}> * </Text>
            </Text>
            <TextInput
              autoCapitalize='none'
              keyboardAppearance='dark'
              returnKeyType='next'
              returnKeyLabel='next'
              value={user.email}
              onChangeText={(value) => {
                setEmail(value)
              }}
            />
          </View>
          <View style={styles.groupPersonal}>
            <Text style={styles.label}>
              Nhân viên tư vấn
              <Text style={{ color: COLORS.blue }}> * </Text>
            </Text>
            <TextInput
              autoCapitalize='none'
              keyboardAppearance='dark'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={(value) => {
                setCreated_by(value)
              }}
            />
          </View>
        </View>
        <View style={styles.groupShowroom}>
          <Text style={styles.title}>Lựa chọn showroom mua xe</Text>
          <View style={styles.groupPersonal}>
            <Text style={styles.label}>
              Tỉnh thành
              <Text style={{ color: COLORS.blue }}> * </Text>
            </Text>
            <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}>
              <RNPickerSelect
                style={{ inputAndroid: { color: 'black' } }}
                onValueChange={(value) => (setValue(value), setProvince(Provinces[value].label))}
                placeholder={{ label: 'Lựa chọn Tỉnh Thành', value: null }}
                items={Provinces}
              />
            </View>
          </View>
          <View style={styles.groupPersonal}>
            <Text style={styles.label}>
              Showroom /Đại lý
              <Text style={{ color: COLORS.blue }}> * </Text>
            </Text>
            <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}>
              <RNPickerSelect
                style={{ inputAndroid: { color: 'black' } }}
                onValueChange={(value) => setShowroom(value)}
                placeholder={{ label: 'Lựa chọn Showroom', value: null }}
                items={Provinces[value].Showroom}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.submit}
          activeOpacity={0.7}
          onPress={onSubmit}
        >
          <Text style={styles.styleText}>Thanh toán đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OrderLast

const styles = StyleSheet.create({
  vfForm: {
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 30,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  groupPersonal: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 14,
    lineHeight: 40,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4
  },
  groupInput: {
    backgroundColor: COLORS.white,
  },
  checkbox: {
    margin: 8,
  },
  vfPayment: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  infoDepositLabel: {
    marginBottom: 8,
    fontWeight: '600',
    color: COLORS.gray,
  },
  content: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 22
  },
  supportHotline: {
    fontWeight: '700',
  },
  selectImage: {
    marginTop: 50,
    marginBottom: 50,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderColor: '#1464f4',
    color: '#1464f4',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  submit: {
    marginTop: 26,
    height: 72,
    paddingHorizontal: 13,
    paddingVertical: 13,
    maxWidth: 440,
    backgroundColor: '#1464f4',
    marginBottom: 50,
  },
  styleText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    lineHeight: 40,
  }
})