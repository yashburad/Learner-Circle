import { WebView } from "react-native-webview";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function BlogsPage(props) {
  console.log(props);
  const html1 =
    '<iframe width="' +
    Dimensions.get("screen").width +
    'px" height="' +
    Dimensions.get("screen").height +
    'px" src="' +
    props.route.params.link +
    '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  console.log(html1);
  const html2 =
    '<iframe width="100%" height="100%" src="https://urfaculty.com/competitions/" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

  return (
    <WebView
      scalesPageToFit={false}
      source={{
        uri: props.route.params.link,
      }}
    />
  );
}

const styles = StyleSheet.create({});
