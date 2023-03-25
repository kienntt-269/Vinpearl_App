import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Link } from '@react-navigation/native';
// import TextInput from '../component/TextInput';
import Button from '../component/Button';
import { COLORS } from '../constants/index'
import { login } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../redux/user/userSlice';
import accountApi from '../api/account';

const SignIn = ({ navigation }) => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit1 = async () => {
    const data = {
      fullName: userName,
      email: email,
      password: password,
    }
    try {
      const res = await accountApi.register(data)
      alert("Tạo tài khoản thành công")
      navigation.navigate("Login")
      console.log(res)
    } catch (err) {
      alert(err)
    }
  }

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const handleSubmit = () => {
    const { email, password } = values;

    let newErrors = {};

    if (!email.trim()) {
      newErrors = { ...newErrors, email: 'Email is required' };
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors = { ...newErrors, email: 'Email is invalid' };
    }

    if (!password.trim()) {
      newErrors = { ...newErrors, password: 'Password is required' };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit the form
    }
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: COLORS.white
      }}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={styles.container}>
      <TextInput
        label="Email"
        mode="outlined"
        value={values.email}
        onChangeText={(value) => handleChange('email', value)}
        error={!!errors.email}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <TextInput
        label="Password"
        mode="outlined"
        value={values.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry={true}
        error={!!errors.password}
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        Sign In
      </Button>
    </View>
      {/* <View style={{ paddingHorizontal: 20, marginBottom: 20, width: '100%' }}>
        <TextInput
          icon='username'
          placeholder='Họ và tên'
          autoCapitalize='none'
          autoCompleteType='email'
          keyboardType='email'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          onChangeText={(value) => {
            setUserName(value)
          }}
        />
      </View>
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
          onChangeText={(value) => {
            setPassword(value)
          }}
        />
      </View>
      <View>
        <Button colorText="fff" disabled={email === "" && password === ""} backgroundColor="#ccc" label='Đăng ký' onPress={handleSubmit} />
      </View> */}
    </KeyboardAvoidingView>
  )
}

export default SignIn

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});