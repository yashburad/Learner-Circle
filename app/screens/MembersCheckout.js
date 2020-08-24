import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { ActivityIndicator } from "react-native-paper";

import ProductCheckout from "../components/ProductCheckout";
import { Formik } from "formik";
import * as yup from "yup";
import { globalStyles } from "../styles/global";
import { AuthContext } from "../components/contexts";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import CheckBox from "react-native-check-box";

const registerSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),

  check: yup.boolean().oneOf([true], "Please check the agreement"),
});

export default function MembersCheckout(props, { navigation }) {
  const [value, onChangeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const { authContext, loginState } = React.useContext(AuthContext);

  async function sendPushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Your course is booked",
        body:
          "It will start at " +
          props.route.params.time +
          " on " +
          props.route.params.date,
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
    console.log(value);
  }

  const checkOut = (values) => {
    console.log("aaa");
    setIsLoading(true);
    fetch("https://learnercircle.herokuapp.com/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: "course",
        id: loginState.userName.id,
        billing: {
          first_name: values.firstName,
          last_name: values.lastName,
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "IND",
          email: values.email,
          phone: values.phone,
        },
        product_id: props.route.params.details.id,
        meta_data: {
          date: props.route.params.date,
          time: props.route.params.time,
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "Internal Server Error") {
          console.log(response);
          setIsLoading(false);
          return;
        } else {
          console.log(response);
          setIsLoading(false);
          props.navigation.navigate("ThankYou");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={{ marginBottom: 50 }}>
        <Image
          style={styles.background}
          resizeMode="cover"
          source={require("../assets/checkout.jpg")}
        />
        <Text style={styles.checkout}>Checkout</Text>

        <View style={styles.container}>
          <Collapse>
            <CollapseHeader>
              <View style={styles.collapse}>
                <Text style={{ fontSize: 18 }}>
                  Have a coupon? Click here to enter your code
                </Text>
              </View>
            </CollapseHeader>
            <CollapseBody style={styles.collapsebody}>
              <Text style={styles.collapsebodytext}>
                If you have a coupon code, please apply it below.
              </Text>
              <TextInput
                style={styles.forminput}
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity style={styles.loginbutton}>
                  <Text style={{ color: "white", fontSize: 14 }}>
                    Apply Coupon
                  </Text>
                </TouchableOpacity>
              </View>
            </CollapseBody>
          </Collapse>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              age: "",
              email: "",
              phone: "",
            }}
            validationSchema={registerSchema}
            onSubmit={async (values, action) => {
              console.log(values);
              action.resetForm();
              checkOut(values);
            }}
          >
            {(prop) => (
              <View>
                <View>
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    Billing Details
                  </Text>
                  <Text style={styles.forminputtitle}>First Name *</Text>
                  <TextInput
                    style={styles.forminput}
                    onChangeText={prop.handleChange("firstName")}
                    value={prop.values.firstName}
                  />

                  <Text style={globalStyles.texterror}>
                    {prop.touched.firstName && prop.errors.firstName}
                  </Text>

                  <Text style={styles.forminputtitle}>Last Name *</Text>
                  <TextInput
                    style={styles.forminput}
                    onChangeText={prop.handleChange("lastName")}
                    value={prop.values.lastName}
                  />

                  <Text style={globalStyles.texterror}>
                    {prop.touched.lastName && prop.errors.lastName}
                  </Text>

                  <Text style={styles.forminputtitle}>
                    Age of the Student *
                  </Text>
                  <TextInput
                    style={styles.forminput}
                    onChangeText={prop.handleChange("age")}
                    value={prop.values.age}
                    keyboardType="numeric"
                  />

                  <Text style={globalStyles.texterror}>
                    {prop.touched.age && prop.errors.age}
                  </Text>

                  <Text style={styles.forminputtitle}>Email ID *</Text>
                  <TextInput
                    style={styles.forminput}
                    onChangeText={prop.handleChange("email")}
                    value={prop.values.email}
                    keyboardType="email-address"
                  />

                  <Text style={globalStyles.texterror}>
                    {prop.touched.email && prop.errors.email}
                  </Text>

                  <Text style={styles.forminputtitle}>Phone *</Text>
                  <TextInput
                    style={styles.forminput}
                    onChangeText={prop.handleChange("phone")}
                    value={prop.values.phone}
                    keyboardType="numeric"
                  />

                  <Text style={globalStyles.texterror}>
                    {prop.touched.phone && prop.errors.phone}
                  </Text>

                  <Text style={globalStyles.texterror}>
                    {prop.touched.password && prop.errors.password}
                  </Text>
                </View>

                <View style={styles.order}>
                  <Text style={{ fontSize: 24, marginBottom: 10 }}>
                    YOUR ORDER
                  </Text>
                  <ProductCheckout
                    details={props.route.params.details}
                    date={props.route.params.date}
                    time={props.route.params.time}
                  />

                  <View style={styles.ordertext}>
                    <Text style={{ fontSize: 16, flex: 1 }}>Subtotal:</Text>
                    <Text style={styles.price}>
                      Rs.{props.route.params.details.price}
                    </Text>
                  </View>
                  <View style={styles.ordertext}>
                    <Text style={{ fontSize: 16, flex: 1 }}>Total:</Text>
                    <Text style={styles.price}>
                      Rs.{props.route.params.details.price}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.learner}>Learner Circle Payment</Text>
                    <Text style={{ backgroundColor: "#eeeeee", padding: 10 }}>
                      You will be redirected to Payment Gateway
                    </Text>
                  </View>
                  <Text
                    style={{
                      borderTopColor: "black",
                      borderTopWidth: 0.5,
                      marginVertical: 10,
                      paddingTop: 10,
                      textAlign: "justify",
                    }}
                  >
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our privacy policy.
                  </Text>
                  <View style={{}}>
                    <CheckBox
                      isChecked={check}
                      onClick={() => setCheck(!check)}
                    />

                    <TouchableOpacity
                      style={{ flexDirection: "row", flexWrap: "wrap" }}
                      onPress={() =>
                        Linking.openURL(
                          "https://urfaculty.com/terms-and-conditions/"
                        )
                      }
                    >
                      <Text style={{ color: "blue" }}>
                        I have read and agree to the website terms and
                        conditions *
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={prop.handleSubmit}
                    style={styles.placeorder}
                    disabled={!check}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Place Order
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  learner: { fontWeight: "bold", marginVertical: 10, fontSize: 20 },
  placeorder: {
    backgroundColor: "#27ae60",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginVertical: 10,
  },
  ordertext: {
    flexDirection: "row",
    marginVertical: 10,
    borderTopColor: "black",
    borderTopWidth: 0.5,
    paddingTop: 10,
  },
  price: { textAlign: "center", flex: 3, fontSize: 16 },
  order: {
    borderColor: "black",
    borderWidth: 0.5,
    marginVertical: 20,
    padding: 20,
  },
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.25,
  },
  checkout: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.15,
    fontSize: 32,
    marginLeft: Dimensions.get("window").width * 0.1,
  },
  container: { marginHorizontal: 20, paddingTop: 20 },
  collapse: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    marginVertical: 10,
  },
  collapsebody: {
    marginTop: 20,
    borderColor: "#d3ced2",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 20,
  },
  collapsebodytext: {
    fontSize: 16,
    lineHeight: 25,
    color: "#666",
  },
  forminput: {
    height: 50,
    borderColor: "#eeeeee",
    borderWidth: 1,
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
  forminputtitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  loginbutton: {
    backgroundColor: "black",
    height: 50,
    width: 100,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
