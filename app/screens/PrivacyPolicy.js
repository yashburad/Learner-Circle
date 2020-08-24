import { WebView } from "react-native-webview";

import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function PrivacyPolicy(props) {
  return (
    <WebView
      bounces={true}
      scalesPageToFit={false}
      source={{
        uri: "https://learnercircle.in/privacy-policy",
      }}
    />
  );
}

const styles = StyleSheet.create({});
