import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Link } from '@react-navigation/native';
import TextInput from '../component/TextInput';
import Button from '../component/Button';
import {COLORS} from '../constants/index'
import { login } from '../redux/user/userSlice';
import { useDispatch, useSelector} from  'react-redux'
import { selectUser } from '../redux/user/userSlice';
import accountApi from '../api/account';
import DefaultStyle from '../theme';

const Login = ({ navigation }) => {
  
  const dispatch = useDispatch(); 
  const user = useSelector(selectUser)
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  const handleSubmit = async () => {
    try {
        const res = await accountApi.login({
          email: email,
          password: password,
        })
        setIsLogin(res.data.code === 200)

        if(res.data.code === 200) {
          navigation.navigate('Auth')
          dispatch(login({
            id: res.data.data.id,
            email: email,
            password: res.data.data.password,
            fullName: res.data.data.fullName,
            role: res.data.data.role,
            loggedIn: true,
          }))
        } else {
          alert("lỗi")
        }
    } catch(err) {
        alert(err)
    }
  }
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: COLORS.white
      }}
    >
      <Text style={[DefaultStyle.text, styles.welcome]}>Welcome Back! 😍</Text>
      <Text style={DefaultStyle.text}>Happy to see you again! Please enter your email and password to login to your account.</Text>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View>
          <Image 
              style={{width: 70, height: 70}}
              source={{uri:'http://192.168.234.1/images/logo-header.png'}}
          />
        </View>
        <Text style={{color: COLORS.black, fontWeight: '600', textAlign: 'center', fontSize: 26, marginBottom: 40, fontFamily: 'Roboto' }}>
          Đăng nhập
        </Text>
        <View style={{ paddingHorizontal: 20, marginBottom: 20, width: '100%' }}>
          <TextInput
            icon='mail'
            placeholder='Email'
            autoCapitalize='none'
            autoCompleteType='email'
            keyboardType='email-address'
            keyboardAppearance='dark'
            returnKeyType='next'
            returnKeyLabel='next'
            style={DefaultStyle.text}
            onChangeText={(value) => {
              setEmail(value)
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 20, marginBottom: 20, width: '100%' }}>
          <TextInput
            icon='key'
            placeholder='Mật khẩu'
            secureTextEntry
            autoCompleteType='password'
            autoCapitalize='none'
            keyboardAppearance='dark'
            returnKeyType='go'
            returnKeyLabel='go'
            style={DefaultStyle.text}
            onChangeText={(value) => {
              setPassword(value)
            }}
          />
        </View>
        <View>
          <Button colorText="fff" disabled={email === "" && password === ""} backgroundColor="#ccc" label='Đăng nhập' onPress={handleSubmit} />
        </View>
        <View style={{paddingHorizontal: 20, width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
          <Pressable
              style={styles.button}
              onPress={() => alert(124)}
          >
              <Link to={{ screen: 'Car' }}>
                  <Text style={[DefaultStyle.text, styles.text]}>Quên mật khẩu</Text>
              </Link>
          </Pressable>
          <Pressable
              style={styles.button}
              onPress={() => alert(124)}
          >
              <Link to={{ screen: 'SignIn', }}>
                  <Text style={[DefaultStyle.text, styles.text]}>Tạo tài khoản</Text>
              </Link>
          </Pressable>
        </View>
      {/* </TouchableWithoutFeedback>   */}
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  welcome: {
    fontSize: 30,
    lineHeight: 39,
    color: '#0D0D0D',
    fontWeight: '700',
    fontFamily: 'Roboto-Black',
    paddingTop: 74,
    marginLeft: 24,
    marginBottom: 14,
  },
    button: {
        paddingVertical: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: COLORS.white,
        elevation: 0
    },
    text: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: COLORS.blue,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: COLORS.blue,
    },
})