import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { globalStyles } from "../styles/global";
import MembershipCheckoutCard from "../components/MembershipCheckoutCard";
import CheckBox from "react-native-check-box";
import { AuthContext } from "../components/contexts";
import RazorpayCheckout from "react-native-razorpay";

const registerSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
  check: yup.boolean().oneOf([true], "Please check the agreement"),
});

export default function Checkout(props, { navigation }) {
  const { authContext, loginState } = React.useContext(AuthContext);
  const [text, onChangeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [id, setId] = useState("");
  const [formValues, setFormValues] = useState([]);

  const generateId = () => {
    fetch("https://learnercircle.herokuapp.com/checkout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: parseInt(props.route.params.details.price) * 100,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setId(response.id);
        console.log("id:" + id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    checkout();
  }, [id]);

  const checkout = () => {
    if (id !== "") {
      var options = {
        description: "Membership Fees",
        image: "https://i.imgur.com/3g7nmJC.png",
        currency: "INR",
        key: "rzp_test_thbbJvSO6lBzmq",
        amount: parseInt(props.route.params.details.price) * 100,
        name: loginState.userName.displayName,
        order_id: id, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
        prefill: {
          email: loginState.userName.email,
          contact: formValues.phone,
          name: loginState.userName.displayName,
        },
        theme: { color: "#53a20e" },
      };

      console.log("iddd:" + options.order_id);
      RazorpayCheckout.open(options)
        .then((data) => {
          // handle success
          alert(`Success: ${data.razorpay_payment_id}`);
          console.log(data);
          orderOut(formValues);
          // generated_signature = hmac_sha256(
          //   data.razorpay_order_id + "|" + data.razorpay_payment_id,
          //   secret
          // );

          // if (generated_signature == data.razorpay_signature) {
          //   console.log("payment is successful");
          // }
        })
        .catch((error) => {
          // handle failure
          alert(`Error: ${error.code} | ${error.description}`);
        });
    }
  };

  const orderOut = (values) => {
    setIsLoading(true);
    fetch("https://learnercircle.herokuapp.com/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: "membership",
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
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.message === "Internal Server Error") {
          console.log(response);
          setIsLoading(false);
          return;
        } else {
          console.log(response);
          setIsLoading(false);
          loginState.userName.status = "active";
          authContext.changeMembership(loginState);
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
            onSubmit={(values, action) => {
              setFormValues(values);
              generateId();
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
                </View>

                <View style={styles.order}>
                  <Text style={{ fontSize: 24, marginBottom: 10 }}>
                    YOUR ORDER
                  </Text>
                  <MembershipCheckoutCard
                    details={props.route.params.details}
                  />

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
