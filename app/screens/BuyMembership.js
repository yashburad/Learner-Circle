import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../components/contexts";

export default function BuyMembership(props, { navigation }) {
  var monthly = { price: "399", planID: "987466561", id: "1832" };
  var annual = { price: "3750", planID: "987466562", id: "1878" };
  const { authContext, loginState } = React.useContext(AuthContext);

  const navigateCheckout = (details) => {
    if (loginState.userName === null) {
      Alert.alert(
        "Kindly Log in to buy a Membership",
        "",
        [
          {
            text: "Dismiss",
          },
          {
            text: "Login",
            onPress: () =>
              props.navigation.navigate("Account", { screen: "Login" }),
          },
        ],
        { cancelable: false }
      );
    } else {
      props.navigation.navigate("MembershipCheckout", { details });
    }
  };

  return (
    <ScrollView style={[globalStyles.container, { paddingHorizontal: 50 }]}>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>
          Join us for a life long learning!
        </Text>
        <View style={styles.border}></View>
      </View>

      <View style={styles.card1}>
        <LinearGradient
          // Background Linear Gradient
          //   linear-gradient(137deg,#FBAB7E 0%,#fa5d87 100%);
          colors={["#FBAB7E", "#fa5d87"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />
        <Text
          style={{
            marginTop: 30,
            fontSize: 36,
            letterSpacing: 5,
          }}
        >
          MONTHLY
        </Text>
        <Text
          style={{
            fontSize: 30,
            letterSpacing: 5,
            fontWeight: "800",
            textDecorationLine: "line-through",
          }}
        >
          Rs 799
        </Text>
        <Text
          style={{
            fontSize: 50,
            letterSpacing: 5,
            fontWeight: "800",
          }}
        >
          Rs 399
        </Text>
        <Text style={styles.planDetails}>Get Unlimited Access</Text>
        <Text style={styles.planDetails}>Unlimited Live Classes</Text>
        <Text style={styles.planDetails}>Talk to experts directly</Text>
        <Text style={styles.planDetails}>Competitions </Text>
        <Text style={styles.planDetails}>31 Days Access</Text>
        <Text
          style={[
            styles.planDetails,
            {
              textDecorationLine: "line-through",
            },
          ]}
        >
          Exclusive online events
        </Text>
        <TouchableOpacity onPress={() => navigateCheckout(monthly)}>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card1}>
        <LinearGradient
          // Background Linear Gradient
          //   linear-gradient(137deg,#FBAB7E 0%,#fa5d87 100%);
          colors={["#FBAB7E", "#fa5d87"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />
        <Text
          style={{
            marginTop: 30,
            fontSize: 36,
            letterSpacing: 5,
            // fontWeight: "bold",
          }}
        >
          ANNUAL
        </Text>
        <Text
          style={{
            fontSize: 30,
            letterSpacing: 5,
            // fontWeight: "bold",
            textDecorationLine: "line-through",
          }}
        >
          Rs 9600
        </Text>
        <Text
          style={{
            fontSize: 50,
            letterSpacing: 5,
            // fontWeight: "bold",
          }}
        >
          Rs 3750
        </Text>
        <Text style={styles.planDetails}>Get Unlimited Access</Text>
        <Text style={styles.planDetails}>Unlimited Live Classes</Text>
        <Text style={styles.planDetails}>Talk to experts directly</Text>
        <Text style={styles.planDetails}>Competitions </Text>
        <Text style={styles.planDetails}>
          12 + 3 additional months access to courses
        </Text>
        <Text style={styles.planDetails}>Exclusive online events</Text>
        <TouchableOpacity onPress={() => navigateCheckout(annual)}>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  planDetails: { marginVertical: 10, fontSize: 18, textAlign: "center" },
  signUp: {
    marginTop: 10,
    backgroundColor: "black",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  card1: {
    marginVertical: 30,
    borderRadius: 20,
    backgroundColor: "lightblue",
    paddingHorizontal: 20,
    // paddingVertical: 30,
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 1,
    // shadowColor: "blue",
    // shadowOffset: {
    //   width: 0,
    //   height: 100,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 4.65,
    // elevation: 9,
  },
  headingView: {
    // paddingHorizontal: 40,
    paddingTop: 30,
    alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
  },
  headingText: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
  },

  border: {
    width: "30%",
    borderBottomColor: "#e09900",
    borderBottomWidth: 2,
    marginTop: 20,
  },
});
