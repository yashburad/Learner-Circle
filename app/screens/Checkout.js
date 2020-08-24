import React, { useState } from "react";
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
import ProductCheckout from "../components/ProductCheckout";
import { Formik } from "formik";
import * as yup from "yup";
import { globalStyles } from "../styles/global";
import { AuthContext } from "../components/contexts";
import CheckBox from "react-native-check-box";

const registerSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
  account: yup.string().required(),
  password: yup.string().required(),
  check: yup.boolean().oneOf([true], "Please check the agreement"),
});

export default function Checkout(props, { navigation }) {
  const [value, onChangeText] = useState("");
  const [password, onPassword] = useState("");
  const [check, setCheck] = useState(false);
  const { authContext, loginState } = React.useContext(AuthContext);

  if (loginState.userName !== null) {
    props.navigation.navigate("MembersCheckout", {
      details: props.route.params.details,
      date: props.route.params.date,
      time: props.route.params.time,
    });
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
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Account", { screen: "Login" })
                  }
                >
                  <Text style={{ fontSize: 18 }}>
                    Returning customer? Click here to login
                  </Text>
                </TouchableOpacity>
              </View>
            </CollapseHeader>
            <CollapseBody style={styles.collapsebody}>
              <Text style={styles.collapsebodytext}>
                If you have shopped with us before, please enter your details
                below. If you are a new customer, please proceed to the Billing
                section.
              </Text>
              <Text style={styles.forminputtitle}>Username or Email *</Text>
              <TextInput
                style={styles.forminput}
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
              <Text style={styles.forminputtitle}>Password *</Text>
              <TextInput
                style={styles.forminput}
                onChangeText={(text) => onPassword(text)}
                value={password}
                secureTextEntry={true}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity style={styles.loginbutton}>
                  <Text style={{ color: "white", fontSize: 22 }}>Login</Text>
                </TouchableOpacity>
                <CheckBox />
                <Text>Remember Me?</Text>
              </View>
            </CollapseBody>
          </Collapse>
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
              account: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, action) => {
              console.log(values);
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

                  <Text style={styles.forminputtitle}>Account Username *</Text>
                  <TextInput
                    placeholder="Username"
                    style={styles.forminput}
                    onChangeText={prop.handleChange("account")}
                    value={prop.values.account}
                  />

                  <Text style={globalStyles.texterror}>
                    {prop.touched.account && prop.errors.account}
                  </Text>

                  <Text style={styles.forminputtitle}>
                    Create Account Password *
                  </Text>
                  <TextInput
                    placeholder="Password"
                    style={styles.forminput}
                    onChangeText={prop.handleChange("password")}
                    value={prop.values.password}
                    secureTextEntry={true}
                  />

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
