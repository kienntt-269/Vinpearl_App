import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import accountApi from '../api/account';
import RadioForm from 'react-native-simple-radio-button';
import DefaultStyle from '../theme';

const PersonalInfo = () => {
  const user = useSelector(selectUser);
  const [customerDetail, setCustomerDetail] = useState({});
  const genderOptions = [
    { label: 'Nam', value: '0' },
    { label: 'Nữ', value: '1' },
    { label: 'Khác', value: '2' },
  ];

  useEffect(() => {
    const getDetailCustomer = async () => {
      try {
          const res = await accountApi.detail(user.id);
          setCustomerDetail(res.data.data);

          setValue('fullName', res.data.data.fullName);
          setValue('gender', res.data.data.sex);
          setValue('email', res.data.data.email);
          setValue('phone', res.data.data.phone);
          setValue('cccd', res.data.data.cccd);
      } catch(err) {
          console.log(err)
      }
    }
    getDetailCustomer();
  }, [])

  const { control, register, handleSubmit, setValue, errors } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const params = {
        fullName: data.fullName,
        sex: data.gender,
        email: data.email,
        phone: data.phone,
        address: data.address,
        cccd: data.cccd,
        typeOfCccd: data.typeOfCccd,
        birthDate: data.birthDate,
        nationality: data.nationality,
        createdDateCccd: data.createdDateCccd,
        expiredDateCccd: data.expiredDateCccd,
      };

      const res = await accountApi.update(user.id, params);
      if (res.data.code === 200) {
        alert("Cập nhật thông tin thành công");
      } else {
        alert("Đã có lỗi trong quá trình xử lý, vui lòng thử lại sau!");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Thông tin cá nhân</Text>
      <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.label]}>Họ và tên</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8, paddingLeft: 8 }}
              placeholder="Họ và tên"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="fullName"
          rules={{ required: true }}
          defaultValue=""
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.label]}>Giới tính</Text>
        <RadioForm
          radio_props={genderOptions}
          initial={0}
          onPress={(value) => setValue('gender', value)}
          buttonColor={'#2196f3'}
          selectedButtonColor={'#2196f3'}
          labelStyle={{ fontSize: 16, marginRight: 16 }}
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.label]}>Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8, paddingLeft: 8 }}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          defaultValue=""
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.label]}>Số điện thoại</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8, paddingLeft: 8 }}
              placeholder="Số điện thoại"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="phone"
          rules={{ required: true, pattern: /^[0-9]{10}$/ }}
          defaultValue=""
        />
      </View>

      <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.label]}>Căn cước công dân</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8, paddingLeft: 8 }}
              placeholder="Căn cước công dân"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="cccd"
          rules={{ required: true, pattern: /^[0-9]{9}$/ }}
          defaultValue=""
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 16, borderRadius: 8, marginTop: 16 }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Lưu thông tin</Text>
      </TouchableOpacity>
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
  },
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
})