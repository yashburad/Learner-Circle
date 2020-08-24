import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../components/contexts";

export default function Account1({ navigation }) {
  const { authContext, loginState } = React.useContext(AuthContext);

  const margin = width / (3 * 10);
  const size = (width - margin * (3 * 2)) / 3;

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("BuyMembership")}
          style={[
            styles.item,
            {
              width: size,
              height: size,
              marginHorizontal: margin,
            },
          ]}
        >
          <MaterialIcons name="account-box" color="#4835bb" size={40} />

          <Text style={styles.itemText}>Membership</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Schedule")}
          style={[
            styles.item,
            {
              width: size,
              height: size,
              marginHorizontal: margin,
            },
          ]}
        >
          <MaterialIcons name="schedule" color="#4835bb" size={40} />
          <Text style={styles.itemText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.item,
            {
              width: size,
              height: size,
              marginHorizontal: margin,
            },
          ]}
        >
          <MaterialIcons name="notifications" color="#4835bb" size={40} />
          <Text style={styles.itemText}>
            Notifications <Text style={{ color: "red" }}>Coming Soon</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Terms and Conditions")}
          style={[
            styles.item,
            {
              width: size,
              height: size,
              marginHorizontal: margin,
            },
          ]}
        >
          <MaterialIcons name="announcement" color="#4835bb" size={40} />
          <Text style={styles.itemText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Privacy Policy")}
          style={[
            styles.item,
            {
              width: size,
              height: size,
              marginHorizontal: margin,
            },
          ]}
        >
          <MaterialIcons name="assignment" color="#4835bb" size={40} />
          <Text style={styles.itemText}>Privacy Policy</Text>
        </TouchableOpacity>
        {/* {loginState.userToken === null && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={[
              styles.item,
              {
                width: size,
                height: size,
                marginHorizontal: margin,
              },
            ]}
          >
            <MaterialCommunityIcons name="login" color="#4835bb" size={40} />
            <Text style={styles.itemText}>Login</Text>
          </TouchableOpacity>
        )} */}
        {loginState.userToken !== null && (
          <TouchableOpacity
            onPress={() => {
              authContext.signOut();
              navigation.navigate("Home", { screen: "Home" });
            }}
            style={[
              styles.item,
              {
                width: size,
                height: size,
                marginHorizontal: margin,
              },
            ]}
          >
            <MaterialCommunityIcons name="logout" color="#4835bb" size={40} />
            <Text style={styles.itemText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
      {loginState.userToken === null && (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              textAlign: "center",
              color: "#4835bb",
              fontSize: 18,
              marginTop: 20,
            }}
          >
            You have not logged in. Click here to Login.
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
  },
  item: {
    // backgroundColor: "white",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  itemText: {
    fontSize: 16,
    textAlign: "center",
    color: "#4835bb",
    marginTop: 10,
  },
});
