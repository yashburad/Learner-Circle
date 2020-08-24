import { WebView } from "react-native-webview";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function ForgotPassword(props) {
  return (
    <WebView
      scalesPageToFit={false}
      source={{
        uri: "https://learnercircle.in/my-account/lost-password/",
      }}
    />
  );
}

const styles = StyleSheet.create({});
