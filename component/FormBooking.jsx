import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, {useState, useEffect, } from 'react'
// import VNPAY from 'react-native-vnpay-gateway';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native';
import { Button } from "@react-native-material/core";
import DefaultStyle from '../theme';
import Price from '../utils/Price';
// import { Checkbox } from 'react-native-material-ui'
import { useForm, Controller } from 'react-hook-form';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import accountApi from '../api/account';
import { useNavigation } from '@react-navigation/native';

const FormBooking = ({ }) => {
  const navigation = useNavigation();
  const user = useSelector(selectUser)
  const [open, setOpen] = useState(false);
  const [customerDetail, setCustomerDetail] = useState({});
  const [value, setValueDrop] = useState(null);
  const [valueFullName, setValueFullName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  
  const [inputFocusFullName, setInputFocusFullName] = useState(false);
  const [inputFocusEmail, setInputFocusEmail] = useState(false);
  const [inputFocusPhone, setInputFocusPhone] = useState(false);
  const [indexGender, setIndexGender] = useState(0);
  
  const dataGender = [
    {name: 'Ông', id: 0},
    {name: 'Bà', id: 1},
    {name: 'Khác', id: 2},
  ]

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
    getValues, 
  } = useForm({});

  useEffect(() => {
    const getDetailCustomer = async () => {
      try {
        const res = await accountApi.detail(user.id);
        console.log(res.data.data);
        setCustomerDetail(res.data.data);
        setValue('fullName', res.data.data.fullName);
        setValue('phone', res.data.data.phone);
        setValue('email', res.data.data.email);
        setIndexGender(res.data.data.sex);
      } catch(err) {
          console.log()
      }
    }
    if (user.id) {
      getDetailCustomer();
    } else {
      navigation.navigate('Login');
    }
  }, [])

  const onSubmit = async () => {
    const values = getValues();
    console.log(values);
    try {
      const dataSet = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        sex: indexGender,
      }
      const res = await accountApi.update(user.id, dataSet);
      console.log(res.data.data);
      navigation.navigate('PaymentBooking');
    } catch(err) {
      console.log(err)
    }
  }

  const renderItemGender = ({ item }) => (
    <TouchableOpacity
        style={styles.genderWrapper}
        onPress={() => setIndexGender(item.id)}
    >
      {
        indexGender == item.id && <MaterialIcons name="radio-button-on" size={24} color="#E8952F" />
      }
      {
        indexGender != item.id && <MaterialIcons name="radio-button-off" size={24} color="#CCC" />
      }
      <Text>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.title}>Thông tin người đặt</Text>
      <ScrollView style={styles.wrapper}>
        <View style={styles.formContainer}>
          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 15,}}>
            <Text style={[DefaultStyle.text, styles.label]}>Danh xưng</Text>
            <FlatList
                horizontal={true}
                data={dataGender}
                renderItem={renderItemGender}
                keyExtractor={(item) => item.id}
            />
          </View>
          <Text style={[DefaultStyle.text, styles.label]}>Họ và tên</Text>
          <View
            style={[
              styles.inputContainer,
              inputFocusFullName && styles.inputFocus,
              ,
              errors.fullName && styles.inputError,
            ]}
          >
            <Controller
              control={control}
              name="fullName"
              validateOnChange={true}
              rules={{
                required: true,
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    onBlur={() => setInputFocusFullName(false)}
                    onChangeText={(value) => {
                      setValueFullName(value);
                      onChange(value);
                    }}
                    value={value}
                    style={[styles.input]}
                    onFocus={() => setInputFocusFullName(true)}
                  />
                </View>
              )}
            />
            {valueFullName !== "" && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setValueFullName("");
                  setValue("fullName", "");
                }}
              >
                <AntDesign name="close" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginBottom: 16, marginTop: 4 }}>
            {errors.fullName && errors.fullName.type == "required" && (
              <Text style={[DefaultStyle.text, styles.error]}>
                Vui lòng nhập Họ và tên
              </Text>
            )}
          </View>
          <Text style={[DefaultStyle.text, styles.label]}>Email</Text>
          <View
            style={[
              styles.inputContainer,
              inputFocusFullName && styles.inputFocus,
              errors.email && styles.inputError,
            ]}
          >
            <Controller
              control={control}
              name="email"
              validateOnChange={true}
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không đúng định dạng",
                },
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    onBlur={() => setInputFocusEmail(false)}
                    onChangeText={(value) => {
                      setValueEmail(value);
                      onChange(value);
                    }}
                    value={value}
                    style={[styles.input]}
                    onFocus={() => setInputFocusEmail(true)}
                  />
                </View>
              )}
            />
            {valueEmail !== "" && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setValueEmail("");
                  setValue("email", "");
                }}
              >
                <AntDesign name="close" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginBottom: 16, marginTop: 4 }}>
            {errors.email && errors.email.type == "required" && (
              <Text style={[DefaultStyle.text, styles.error]}>
                Vui lòng nhập Email
              </Text>
            )}
            {errors.email && errors.email.type == "pattern" && (
              <Text style={[DefaultStyle.text, styles.error]}>
                {errors.email.message}
              </Text>
            )}
            {errors.email && errors.email.type == "maxLength" && (
              <Text style={[DefaultStyle.text, styles.error]}>
                Email tối đa 100 ký tự
              </Text>
            )}
          </View>
          <Text style={[DefaultStyle.text, styles.label]}>Số điện thoại</Text>
          <View
            style={[
              styles.inputContainer,
              inputFocusPhone && styles.inputFocus,
              ,
              errors.phone && styles.inputError,
            ]}
          >
            <Controller
              control={control}
              validateOnChange={true}
              name="phone"
              rules={{
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,30}$/,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={() => setInputFocusPhone(false)}
                  onChangeText={(value) => {
                    setValuePhone(value);
                    onChange(value);
                  }}
                  value={value}
                  style={[styles.input]}
                  onFocus={() => setInputFocusPhone(true)}
                />
              )}
            />
            {valuePhone !== "" && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setValuePhone("");
                  setValue("phone", "");
                }}
              >
                <AntDesign name="close" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginBottom: 16, marginTop: 4 }}>
            {errors.password && errors.password.type == "required" && (
              <Text style={[DefaultStyle.text, styles.error]}>
                Vui lòng nhập số điện thoại
              </Text>
            )}
            {errors.phone && errors.phone.type == "pattern" && (
              <Text style={[DefaultStyle.text, styles.error]}>
                {errors.phone.message}
              </Text>
            )}
          </View>
        </View>
        {/* <View>
          <Checkbox label="Tôi là người lưu trú" value="1" checked={true} />
          <Checkbox label="Lưu thông tin vào sổ tay hành khách" value="2" checked={true} />
          <Checkbox label="Đồng ý nhận thông tin qua Email" value="3" checked={true} />
        </View> */}
      </ScrollView>
      <View style={styles.navigateBooking}>
        <View style={[DefaultStyle.text, styles.text2]}>
            <Text style={{flex: 1, color: '#919191', fontWeight: '500'}}>{`Tổng giá (Bao gồm thuế & phí)`}</Text>
            <Text style={{flex: 1}}>
                <Price active={true} value={55000000}/>
            </Text>
        </View>
        <Button
            title="Đặt ngay"
            style={{backgroundColor: '#E8952F', }}
            uppercase={false}
            onPress={onSubmit}
        />
      </View>
    </View>
  )
}

export default FormBooking

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    marginRight: 10,
  },
  genderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
    fontSize: 14,
    color: COLORS.gray,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingLeft: 16,
    fontSize: 14,
    height: 40,
  },
  inputError: {
    borderColor: "red",
  },
  inputFocus: {
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  error: {
    color: "red",
  },
  buttonGroup: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 50,
    lineHeight: 50,
    backgroundColor: "#3498db",
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2F80ED",
  },
  formContainer: {
    paddingHorizontal: 15,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 15,
  },
  inputContainer: {
    // borderWidth: 1,
    // borderColor: "#E0E0E0",
    // borderRadius: 4,
  },
  inputContainerFocused: {
    borderColor: "#2F80ED",
  },
  button: {
    backgroundColor: "#2F80ED",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    top: 2,
    right: 4,
    padding: 8,
  },
  navigateBooking: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})