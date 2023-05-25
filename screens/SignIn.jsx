import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Link } from "@react-navigation/native";
// import TextInput from '../component/TextInput';
import Button from "../component/Button";
import { COLORS } from "../constants/index";
import { login } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";
import accountApi from "../api/account";
import { useForm, Controller } from "react-hook-form";
import DefaultStyle from "../theme";
import { AntDesign } from "@expo/vector-icons";
import domain from "../api/domain";

const SignIn = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({});
  const [valueFullName, setValueFullName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await accountApi.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      alert("Đăng ký thành công");
      navigation.navigate("Login");
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };

  const [inputFullNameFocus, setInputFullNameFocus] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [inputPassFocus, setInputPassFocus] = useState(false);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={hideKeyboard}
    >
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 70, height: 70 }}
          source={{
            uri: `${domain}/images/home/logo/vinpearl-logo.svg`,
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={[DefaultStyle.text, styles.label]}>Họ và tên</Text>
        <View
          style={[
            styles.inputContainer,
            inputFullNameFocus && styles.inputFocus,
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
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  onBlur={() => setInputFullNameFocus(false)}
                  onChangeText={(value) => {
                    setValueFullName(value);
                    onChange(value);
                  }}
                  value={value}
                  style={[styles.input]}
                  onFocus={() => setInputFullNameFocus(true)}
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
            inputFocus && styles.inputFocus,
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
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,30}$/,
                message:
                  "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt và có độ dài từ 8 đến 30 ký tự",
              },
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
                setValue("email", "");
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
          {errors.password && errors.password.type == "pattern" && (
            <Text style={[DefaultStyle.text, styles.error]}>
              {errors.password.message}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Bạn đã có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupButton}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SignIn;

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
