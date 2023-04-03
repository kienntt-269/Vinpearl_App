import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect, } from 'react'
// import VNPAY from 'react-native-vnpay-gateway';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native';
import { Button, TextInput } from "@react-native-material/core";
import DefaultStyle from '../theme';
import Price from '../utils/Price';
// import { Checkbox } from 'react-native-material-ui'
import { useForm, Controller } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import accountApi from '../api/account';

const FormBooking = ({ route, navigation }) => {
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
  
  const [items, setItems] = useState([
    {label: 'Ông', value: '1'},
    {label: 'Bà', value: '2'},
    {label: 'Khác', value: '3'},
  ]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },

  } = useForm({});

  useEffect(() => {
    const getDetailCustomer = async () => {
      try {
        const res = await accountApi.detail(user.id);
        setCustomerDetail(res.data.data);
        setValue('fullName', res.data.data.fullName);
        setValue('phone', res.data.data.phone);
        setValue('email', res.data.data.email);
        setValue('fullName', res.data.data.fullName);
      } catch(err) {
          console.log(err)
      }
    }
    getDetailCustomer();
  }, [])

  return (
    <View>
      <Text style={styles.title}>Thông tin người đặt</Text>
      <ScrollView style={styles.wrapper}>
        <View>
          <Text style={styles.header}>Danh xưng</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValueDrop}
            setItems={setItems}
          />
        </View>
        <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.label]}>Họ và tên</Text>
        <View style={[styles.inputContainer, inputFocusFullName && styles.inputFocus, , errors.fullName && styles.inputError]}>
          <Controller
            control={control}
            name="fullName"
            validateOnChange={true}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ flexDirection: "row" }}>
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
          {
            valueFullName !== "" && (
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
        <View style={{marginBottom: 16, marginTop: 4,}}>
          {errors.fullName && errors.fullName.type == "required" && (
            <Text style={[DefaultStyle.text, styles.error]}>
              Vui lòng nhập Họ và tên
            </Text>
          )}
        </View>
        </View>
        <View style={styles.wrapper}>
          <Text style={[DefaultStyle.text, styles.label]}>Email</Text>
          <View style={[styles.inputContainer, inputFocus && styles.inputFocus, , errors.email && styles.inputError]}>
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
                <View style={{ flexDirection: "row" }}>
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
            {
              valueEmail !== "" && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setValueEmail("");
                    setValue("email", "");
                  }}
                >
                  <AntDesign name="close" size={24} color={COLORS.gray} />
                </TouchableOpacity>
              )
            }
          </View>
          <View style={{marginBottom: 16, marginTop: 4,}}>
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
        </View>
        <View style={styles.wrapper}>
        <Text style={[DefaultStyle.text, styles.label]}>Số điện thoại</Text>
          <View style={[styles.inputContainer, inputFocus && styles.inputFocus, , errors.email && styles.inputError]}>
            <Controller
              control={control}
              name="phone"
              validateOnChange={true}
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Số điện thoại không đúng định dạng",
                },
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ flexDirection: "row" }}>
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
                </View>
              )}
            />
            {
              valuePhone !== "" && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setValuePhone("");
                    setValue("phone", "");
                  }}
                >
                  <AntDesign name="close" size={24} color={COLORS.gray} />
                </TouchableOpacity>
              )
            }
          </View>
          <View style={{marginBottom: 16, marginTop: 4,}}>
            {errors.phone && errors.phone.type == "required" && (
              <Text style={[DefaultStyle.text, styles.error]}>
                Vui lòng nhập Số điện thoại
              </Text>
            )}
            {errors.phone && errors.phone.type == "pattern" && (
              <Text style={[DefaultStyle.text, styles.error]}>
                {errors.phone.message}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.wrapper}>
          <Text>Quốc tịch</Text>
          <TextInput label="Quốc tịch" style={{ margin: 16 }} />
        </View>
        {/* <View>
          <Checkbox label="Tôi là người lưu trú" value="1" checked={true} />
          <Checkbox label="Lưu thông tin vào sổ tay hành khách" value="2" checked={true} />
          <Checkbox label="Đồng ý nhận thông tin qua Email" value="3" checked={true} />
        </View> */}
      </ScrollView>
      <View style={styles.navigateBooking}>
        <Text style={[DefaultStyle.text, styles.text2]}>
            <Text style={{width: '100%'}}>{`Tổng giá (Bao gồm thuế & phí)`}</Text>
            <Text style={{width: '100%'}}>
                <Price active={true} value={55000000}/>
            </Text>
        </Text>
        <Button
            title="Tiếp tục"
            style={{backgroundColor: '#E8952F', }}
            uppercase={false}
            onPress={() => navigation.navigate('ConfirmBooking', {
                // serviceId: 1,
                // roomTypeId: 1,
                // name: "name",
            })}
        />
      </View>
    </View>
  )
}

export default FormBooking

const styles = StyleSheet.create({
  title: {

  },
  wrapper: {

  },
  header: {

  },
  wrapper: {

  },
  navigateBooking: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text2: {
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
    fontSize: 14,
    color: COLORS.gray,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 50,
    borderRadius: 8,
    paddingLeft: 16,
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
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2F80ED',
  },
  formContainer: {
    width: '80%',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainerFocused: {
    borderColor: '#2F80ED',
  },
  input: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2F80ED',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  signupText: {
    fontSize: 16,
    marginRight: 8,
  },
  signupButton: {
    fontSize: 16,
    color: '#2F80ED',
  },
  closeButton: {
    position: 'absolute',
    top: 2,
    right: 4,
    padding: 8,
  },
})