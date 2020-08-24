import React, { useEffect, useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../styles/global";
import { AuthContext } from "../components/contexts";
import Login from "./Login";
import MembershipCard from "../components/MembershipCard";

export default class MembershipPlan extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.context.loginState.userToken !== null) {
      this.setState({ isLoading: true });
      fetch("https://learnercircle.herokuapp.com/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request: "members",
          customer: this.context.loginState.userName.email,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "Internal Server Error") {
            console.log(response);
            this.setState({ isLoading: true });
            return;
          } else {
            this.setState({ isLoading: false, data: response });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  renderFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  render() {
    if (this.state.isLoading === false && this.state.data.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.login}>
            You have not bought any Membership Plan
          </Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("BuyMembership")}
          >
            <Text style={styles.loginButton}>Exploree</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <FlatList
          style={styles.data}
          ListHeaderComponent={<this.renderFooter />}
          data={this.state.data}
          renderItem={({ item }) => <MembershipCard details={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  login: { fontSize: 18, paddingHorizontal: 20 },
  loginButton: {
    marginTop: 10,
    fontSize: 20,
    color: "#4835bb",
    fontWeight: "bold",
  },
  header: { padding: 10 },
  loader: { marginTop: 10, alignItems: "center" },
  data: { padding: 10 },
});
