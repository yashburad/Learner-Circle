import React, { useEffect, useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";
import CourseCard from "./CourseCard";
import Search from "./Search";

import sample from "./sample.json";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../components/contexts";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      page: 1,
      refreshing: false,
    };
  }
  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.loadCourses();
    this.setState({ refreshing: false });
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://learnercircle.herokuapp.com/course", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        per_page: 20,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "Internal Server Error") {
          console.log(response);
          this.setState({ isLoading: false });
          return;
        } else {
          this.setState({
            isLoading: false,
            page: this.state.page + 1,
            data: response,
          });
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  }

  loadCourses = () => {
    this.setState({ isLoading: true });
    fetch("https://learnercircle.herokuapp.com/course", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: this.state.page,
        per_page: 20,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "Internal Server Error") {
          console.log(response);
          this.setState({ isLoading: false });
          return;
        } else {
          this.setState({
            isLoading: false,
            page: this.state.page + 1,
            data: this.state.data.concat(response),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  render() {
    return (
      <FlatList
        ListHeaderComponent={
          <>
            <View>
              <Image
                blurRadius={1}
                style={{
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height * 0.25,
                }}
                resizeMode="cover"
                source={require("../assets/checkout.jpg")}
              />
              <Text
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "20%",
                  fontSize: 32,
                  // color: "black",
                }}
              >
                Explore Courses
              </Text>
            </View>
            <Search navigation={this.props.navigation} />
            <Text
              style={{
                alignItems: "center",
                fontSize: 26,
                textAlign: "center",
              }}
            >
              Free courses & sessions for members
            </Text>

            <Text
              style={{
                alignItems: "center",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              These are free for members and paid for non-members.
            </Text>
            {this.state.data.length === 0 && this.state.isLoading === false && (
              <TouchableOpacity onPress={() => this.loadCourses()}>
                <Text
                  style={{
                    alignItems: "center",
                    textAlign: "center",

                    fontSize: 20,
                    marginVertical: 10,
                  }}
                >
                  Reload
                </Text>
              </TouchableOpacity>
            )}
          </>
        }
        style={styles.cards}
        data={this.state.data}
        numColumns={2}
        renderItem={({ item }) => (
          <CourseCard element={item} navigation={this.props.navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.loadCourses}
        ListFooterComponent={this.renderFooter()}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({
  loader: { marginTop: 10, alignItems: "center" },
  cards: {
    backgroundColor: "white",
  },
});
