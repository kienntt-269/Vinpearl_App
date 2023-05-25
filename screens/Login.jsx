import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Link } from "@react-navigation/native";
import Button from "../component/Button";
import { COLORS } from "../constants/index";
import { login } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import accountApi from "../api/account";
import DefaultStyle from "../theme";
import { useForm, Controller } from "react-hook-form";
import utils from "../utils/utils";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import domain from "../api/domain";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [inputPassFocus, setInputPassFocus] = useState(false);
  const [valueEmail, setValueEmail] = useState();
  const [valuePassword, setValuePassword] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm({});

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await accountApi.login({
        email: data.email,
        password: data.password,
      });
      setIsLogin(res.data.code === 200);

      if (res.data.code === 200) {
        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem(utils.CONSTANTS.TOKEN, res.data.data.token);
        // await AsyncStorage.setItem(utils.CONSTANTS.CUSTOMER_ID, res.data.data.id);
        navigation.navigate("Auth");
        dispatch(
          login({
            id: res.data.data.id,
            email: data.email,
            password: res.data.data.password,
            fullName: res.data.data.fullName,
            role: res.data.data.role,
            loggedIn: true,
          })
        );
      } else {
        alert("lỗi");
      }
    } catch (err) {
      alert(err);
    }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (valueEmail != undefined) {
      console.log(valueEmail);
      trigger("email");
    }
    return () => {};
  }, [valueEmail]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={hideKeyboard}
    >
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 120, height: 120, resizeMode: "contain" }}
          source={{
            uri: `${domain}/images/home/logo/vinpearl-logo.png`,
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={[DefaultStyle.text, styles.label]}>Email</Text>
        <View
          style={[
            styles.inputContainer,
            inputFocus && styles.inputFocus,
            ,
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
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  onBlur={() => setInputFocus(false)}
                  onChangeText={(value) => {
                    setValueEmail(value);
                    onChange(value);
                  }}
                  value={value}
                  style={[styles.input]}
                  onFocus={() => setInputFocus(true)}
                />
              </View>
            )}
          />
          {valueEmail && (
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
        <Text style={[DefaultStyle.text, styles.label]}>Mật khẩu</Text>
        <View
          style={[
            styles.inputContainer,
            inputPassFocus && styles.inputFocus,
            ,
            errors.password && styles.inputError,
          ]}
        >
          <Controller
            control={control}
            validateOnChange={true}
            name="password"
            rules={{
              required: true,
              // pattern: {
              //   value:
              //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,30}$/,
              //   message:
              //     "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt và có độ dài từ 8 đến 30 ký tự",
              // },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={() => setInputPassFocus(false)}
                onChangeText={(value) => {
                  setValuePassword(value);
                  onChange(value);
                }}
                value={value}
                secureTextEntry
                style={[styles.input]}
                onFocus={() => setInputPassFocus(true)}
              />
            )}
          />
          {valuePassword !== "" && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setValuePassword("");
                setValue("password", "");
              }}
            >
              <AntDesign name="close" size={24} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginBottom: 16, marginTop: 4 }}>
          {errors.password && errors.password.type == "required" && (
            <Text style={[DefaultStyle.text, styles.error]}>
              Vui lòng nhập mật khẩu
            </Text>
          )}
          {/* {errors.password && errors.password.type == "pattern" && (
            <Text style={[DefaultStyle.text, styles.error]}>
              {errors.password.message}
            </Text>
          )} */}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signupButton}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Login;

const styles = StyleSheet.create({
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
    width: "80%",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainerFocused: {
    borderColor: "#2F80ED",
  },
  input: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2F80ED",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textTransform: "uppercase",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 32,
  },
  signupText: {
    fontSize: 16,
    marginRight: 8,
  },
  signupButton: {
    fontSize: 16,
    color: "#2F80ED",
  },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 4,
    padding: 8,
  },
});
