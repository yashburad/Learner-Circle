import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Picker,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Review from "../components/Review";
import Description from "../components/Description";
import Background from "./Background";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../components/contexts";
import RelatedProducts from "../components/RelatedProducts";
import CheckBox from "react-native-check-box";
import RNPickerSelect from "react-native-picker-select";

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default function Course(props, { navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [check, setCheck] = useState(false);
  const { authContext, loginState } = React.useContext(AuthContext);

  useEffect(() => {
    loadCourses();
  }, []);
  const navigateCheckout = (details) => {
    let check1 = check;
    if (props.route.params.details.attributes.length < 3) {
      check1 = true;
    }
    if (date === "" || time === "" || !check1) {
      Alert.alert(
        "Alert",
        "Choose Date and Time and Kindly confirm your Age.",
        [
          {
            text: "Dismiss",
          },
        ],
        { cancelable: false }
      );
    } else if (loginState.userName !== null) {
      if (loginState.userName.status !== "active") {
        Alert.alert(
          "You dont own a membership",
          "",
          [
            {
              text: "Dismiss",
            },
            {
              text: "Buy",
              onPress: () =>
                props.navigation.navigate("Account", {
                  screen: "BuyMembership",
                }),
            },
          ],
          { cancelable: false }
        );
      } else {
        props.navigation.navigate("MembersCheckout", { date, time, details });
      }
    } else {
      Alert.alert(
        "Kindly Log in to book a course",
        "",
        [
          {
            text: "Dismiss",
          },
          {
            text: "Login",
            onPress: () =>
              props.navigation.navigate("Account", { screen: "Login" }),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const loadCourses = () => {
    setData([]);
    setIsLoading(true);
    fetch("https://learnercircle.herokuapp.com/course", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        include: props.route.params.details.related_ids.toString(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length === 0) {
          setIsLoading(false);
          return;
        } else {
          setData(response);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <Background image={props.route.params.details.meta_data} />
      <View style={styles.container}>
        <Text numberOfLines={3} style={styles.courseName}>
          {props.route.params.details.name}
        </Text>

        <Image
          style={styles.courseImage}
          source={{ uri: props.route.params.details.images[0].src }}
        />

        <Text numberOfLines={2} style={[styles.courseName, { paddingTop: 20 }]}>
          ₹ {props.route.params.details.price}
        </Text>

        <View>
          <Text style={{ fontSize: 24 }}>Learning Session Details</Text>
        </View>
        <FlatList
          data={props.route.params.details.short_description}
          renderItem={({ item }) => <Item title={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        {props.route.params.details.stock_status === "instock" &&
          props.route.params.details.attributes.length > 1 && (
            <View>
              <View style={styles.date}>
                <Text>Date:</Text>

                {Platform.OS !== "android" && (
                  <RNPickerSelect
                    onValueChange={(value) => setDate(value)}
                    items={props.route.params.details.attributes[0].options.map(
                      (element, index) => {
                        return { value: element, label: element };
                      }
                    )}
                  />
                )}

                {Platform.OS === "android" && (
                  <Picker
                    selectedValue={date}
                    style={{ height: 50, width: "60%" }}
                    onValueChange={(itemValue, itemIndex) => setDate(itemValue)}
                  >
                    <Picker.Item label="Choose an Option" value="" />
                    {props.route.params.details.attributes[0].options.map(
                      (element, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={element}
                            value={element}
                          />
                        );
                      }
                    )}
                  </Picker>
                )}
              </View>
              <View style={styles.date}>
                <Text>Time:</Text>

                {Platform.OS !== "android" && (
                  <RNPickerSelect
                    onValueChange={(value) => setTime(value)}
                    items={props.route.params.details.attributes[1].options.map(
                      (element, index) => {
                        return { value: element, label: element };
                      }
                    )}
                  />
                )}

                {Platform.OS === "android" && (
                  <Picker
                    selectedValue={time}
                    style={{ height: 50, width: "60%" }}
                    onValueChange={(itemValue, itemIndex) => setTime(itemValue)}
                  >
                    <Picker.Item label="Choose an Option" value="" />
                    {props.route.params.details.attributes[1].options.map(
                      (element, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={element}
                            value={element}
                          />
                        );
                      }
                    )}
                  </Picker>
                )}
              </View>
              {props.route.params.details.attributes.length > 2 && (
                <TouchableOpacity
                  onPress={() => setCheck(!check)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <CheckBox
                    isChecked={check}
                    onClick={() => setCheck(!check)}
                  />
                  <TouchableOpacity onPress={() => setCheck(!check)}>
                    <Text>
                      {props.route.params.details.attributes[2].options[0]}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.button1}
                onPress={() => navigateCheckout(props.route.params.details)}
              >
                <Text style={{ color: "white" }}>Course Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        {props.route.params.details.stock_status === "outofstock" && (
          <View>
            <Text style={styles.outStock}>Out of Stock</Text>
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <View style={styles.description}>
            <Text>Description</Text>
          </View>
          <Description html={props.route.params.details.description} />

          <View style={styles.review}>
            <Text>Review (0)</Text>
          </View>
          <Review />
        </View>

        <View style={styles.related}>
          <Text style={{ fontSize: 24 }}>Related Products</Text>
          {isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" />
            </View>
          )}
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <RelatedProducts element={item} navigation={props.navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    top: -150,
  },
  outStock: { fontSize: 20, color: "crimson", marginTop: 10 },
  courseName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  courseImage: {
    width: "100%",
    height: 200,
  },
  courseImage1: {
    width: "100%",
    height: 300,
  },
  title: {
    marginTop: 5,
    // marginLeft: 5,
    fontSize: 16,
    color: "grey",
  },
  date: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  button1: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#8300e9",
    paddingVertical: 15,
    borderRadius: 10,
  },
  review: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 0.5,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  description: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 0.5,
    // borderBottomWidth: 0.25,
  },
  related: {
    paddingVertical: 20,
  },
});
