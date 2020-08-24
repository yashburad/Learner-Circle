import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";
import CourseCard from "./CourseCard";
import sample from "./sample.json";
import { Searchbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default function Search(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    // loadCourses();
  }, []);

  const loadCourses = () => {
    setData([]);
    setIsLoading(true);
    setNoResults(false);
    fetch("https://learnercircle.herokuapp.com/course", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: searchQuery,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length === 0) {
          setNoResults(true);
          setIsLoading(false);
          console.log(noResults);
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
  const loadCourses1 = (query) => {
    setData([]);
    setIsLoading(true);
    setNoResults(false);
    fetch("https://learnercircle.herokuapp.com/course", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: query,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "Internal Server Error") {
          setNoResults(true);
          setIsLoading(false);
          console.log(noResults);
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

  renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  const [searchQuery, setSearchQuery] = React.useState("");
  const categories = [
    "Fitness",
    "Education",
    "Music",
    "Editing",
    "Language",
    "Skill-Build",
  ];
  const onChangeSearch = (query) => setSearchQuery(query);

  const tagPress = (query1) => {
    // setSearchQuery(query1);
    loadCourses1(query1);
  };
  if (noResults) {
    return (
      <View>
        <View
          style={{ paddingHorizontal: 10, paddingTop: 10, marginBottom: 10 }}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.search}
            onIconPress={loadCourses}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
          >
            {categories.map((element, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{ justifyContent: "center", alignItems: "center" }}
                  onPress={() => {
                    setSearchQuery(element);
                    tagPress(element);
                  }}
                >
                  <View style={styles.tag}>
                    <Text>{element}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            No Results Found
          </Text>
        </View>
      </View>
    );
  }
  return (
    // <ScrollView style={globalStyles.container}>
    <FlatList
      ListHeaderComponent={
        <>
          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.search}
              onIconPress={loadCourses}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row" }}
            >
              {categories.map((element, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ justifyContent: "center", alignItems: "center" }}
                    onPress={() => {
                      setSearchQuery(element);
                      tagPress(element);
                    }}
                  >
                    <View style={styles.tag}>
                      <Text>{element}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </>
      }
      style={styles.cards}
      data={data}
      numColumns={2}
      renderItem={({ item }) => (
        <CourseCard element={item} navigation={props.navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
    />
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: { marginTop: 10, alignItems: "center" },
  cards: {
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    paddingTop: 20,
  },
  search: {
    borderColor: "#eeeeee",
    borderWidth: 0.5,
    borderRadius: 15,
    marginBottom: 10,
  },
  tag: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: "#eeeeee",
    borderWidth: 3,
    marginHorizontal: 5,
  },
});
