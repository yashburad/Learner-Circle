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
import OrderCard from "../components/OrderCard";

export default class Orders extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      refreshing: false,
      page: 20,
    };
  }

  componentDidMount() {
    console.log(this.context.loginState);
    if (this.context.loginState.userToken !== null) {
      this.setState({ isLoading: true });

      fetch("https://learnercircle.herokuapp.com/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request: "orders",
          per_page: this.state.page,
          customer: this.context.loginState.userName.id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "Internal Server Error") {
            this.setState({ isLoading: false });
            return;
          } else {
            this.setState({
              isLoading: false,
              data: response,
              page: this.state.page + 10,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  loadOrders = () => {
    if (this.context.loginState.userToken !== null) {
      this.setState({ isLoading: true });
      fetch("https://learnercircle.herokuapp.com/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request: "orders",
          per_page: this.state.page,
          customer: this.context.loginState.userName.id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "Invalid parameter(s): per_page") {
            this.setState({ isLoading: false });
            return;
          } else {
            this.setState({
              isLoading: false,
              data: response,
              page: this.state.page + 10,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.loadOrders();
    this.setState({ refreshing: false });
  };

  renderFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  render() {
    if (this.context.loginState.userToken !== null) {
      if (this.state.isLoading === false && this.state.data.length === 0) {
        return (
          <View style={styles.container}>
            <Text style={styles.login}>What will you learn first?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text style={styles.loginButton}>Explore</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleRefresh()}>
              <Text style={[styles.loginButton, { fontSize: 14 }]}>Reload</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <FlatList
            style={styles.data}
            ListHeaderComponent={<this.renderFooter />}
            data={this.state.data}
            renderItem={({ item }) => {
              if (item.line_items[0].meta_data.length > 0) {
                return <OrderCard details={item} />;
              }
            }}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            ListFooterComponent={
              <TouchableOpacity onPress={() => this.loadOrders()}>
                <Text
                  style={{
                    fontSize: 24,
                    textAlign: "center",
                    marginVertical: 10,
                  }}
                >
                  Explore More
                </Text>
              </TouchableOpacity>
            }
          />
        );
      }
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.login}>You're not logged In</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Account", { screen: "Login" })
            }
          >
            <Text style={styles.loginButton}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  login: { fontSize: 24 },
  loginButton: {
    marginTop: 10,
    fontSize: 20,
    color: "#4835bb",
    // fontWeight: "bold",
  },
  header: { padding: 10 },
  loader: { marginTop: 10, alignItems: "center" },
  data: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
    marginBottom: 20,
  },
});
