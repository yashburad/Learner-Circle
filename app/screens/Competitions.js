import { WebView } from "react-native-webview";

import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function Competitions() {
  const html1 =
    '<iframe width="' +
    Dimensions.get("screen").width +
    'px" height="' +
    Dimensions.get("screen").height +
    'px" src="https://learnercircle.in/competitions/" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  console.log(html1);
  const html2 =
    '<iframe width="100%" height="100%" src="https://urfaculty.com/competitions/" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

  return (
    <WebView
      bounces={true}
      scalesPageToFit={false}
      source={{
        uri: "https://urfaculty.com/competitions/",
      }}
    />
  );
}

const styles = StyleSheet.create({});
