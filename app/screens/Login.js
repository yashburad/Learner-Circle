import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "../components/contexts";

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const loginAuth = (values) => {
    setIsLoading(true);
    fetch("https://learnercircle.herokuapp.com", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        if (response.success) {
          navigation.pop();
          navigation.navigate("Home");
          console.log(response);
          authContext.signIn(response.data);
        } else {
          console.log(response);
          Alert.alert(
            "Login Error",
            "Wrong Login Credentials",
            [
              {
                text: "Dismiss",
              },
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const { authContext, loginState } = React.useContext(AuthContext);
  if (loginState.userToken !== null) {
    return (
      <View>
        <Text>a</Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.imageview}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("../assets/06.png")}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 26 }}>Sign In Securely</Text>
      </View>
      <View style={styles.loginform}>
        <View style={styles.loginbox}>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, action) => {
              // action.resetForm();
              console.log(values);
              loginAuth(values);
            }}
          >
            {(props) => (
              <View>
                <Text style={globalStyles.forminputtitle}>
                  Email Address or User name
                </Text>
                <TextInput
                  style={globalStyles.forminput}
                  onChangeText={props.handleChange("username")}
                  value={props.values.username}
                  // onBlur={props.handleBlur("username")}
                />
                <Text style={globalStyles.texterror}>
                  {props.touched.username && props.errors.username}
                </Text>

                <Text style={globalStyles.forminputtitle}>Password </Text>
                <TextInput
                  style={globalStyles.forminput}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry={true}
                  onBlur={props.handleBlur("password")}
                />
                <Text style={globalStyles.texterror}>
                  {props.touched.password && props.errors.password}
                </Text>

                <TouchableOpacity
                  style={globalStyles.button}
                  onPress={props.handleSubmit}
                >
                  <Text style={{ color: "white" }}>LOGIN</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 16 }}>
                  Forgot your password?
                </Text>
              </View>
            )}
          </Formik>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Terms & Conditions</Text>
          <Text style={{ fontSize: 18 }}>Privacy Policy</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageview: {
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    marginTop: Dimensions.get("screen").height * 0.05,
  },
  logo: {
    width: "50%",
  },
  loginform: {
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  loginbox: {
    borderColor: "#d3ced2",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },
});
