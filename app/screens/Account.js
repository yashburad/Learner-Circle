import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";
import { AuthContext } from "../components/contexts";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function Account({ navigation }) {
  const { authContext, loginState } = React.useContext(AuthContext);

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.view}>
        <Text style={{ marginBottom: 10 }}>Support</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>About Learner Circle </Text>
          <MaterialIcons name="chevron-right" size={26} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Buy Membership")}
        >
          <Text style={styles.buttonText}>Buy Membership Plan </Text>
          <MaterialIcons name="chevron-right" size={26} color="gray" />
        </TouchableOpacity>

        {loginState.userToken === null && (
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>LOGIN</Text>
          </TouchableOpacity>
        )}
        {loginState.userToken !== null && (
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("MembershipPlan")}
            >
              <Text style={styles.buttonText}>Your Membership Plan </Text>
              <MaterialIcons name="chevron-right" size={26} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => {
                authContext.signOut();
                navigation.navigate("Home", { screen: "Home" });
              }}
            >
              <Text style={{ color: "white" }}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    // borderBottomColor: "gray",
    // borderBottomWidth: 0.5,
  },
  buttonText: { fontSize: 16 },
});
