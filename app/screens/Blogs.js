import { WebView } from "react-native-webview";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import BlogCard from "./BlogCards";

export default class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      refreshing: false,
      page: 1,
    };
  }

  loadBlogs = () => {
    this.setState({ isLoading: true });
    fetch(
      "https://learnercircle.in/wp-json/wp/v2/posts/?page=" + this.state.page,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (
          response.message ===
          "The page number requested is larger than the number of pages available."
        ) {
          console.log(response);
          this.setState({ isLoading: false });
          return;
        } else {
          this.setState({
            isLoading: false,
            data: this.state.data.concat(response),
            page: this.state.page + 1,
          });
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadBlogs();
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.loadBlogs();
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
    return (
      <FlatList
        style={styles.cards}
        data={this.state.data}
        numColumns={2}
        renderItem={({ item }) => (
          <BlogCard element={item} navigation={this.props.navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.loadBlogs}
        ListFooterComponent={this.renderFooter()}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({});
