// import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";
import { StyleSheet, StatusBar, Platform, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import Login from "./app/screens/Login";
import Course from "./app/screens/Course";
import Checkout from "./app/screens/Checkout";
import Home from "./app/screens/Home";
import Search from "./app/screens/Search";
import Account from "./app/screens/Account";
import MembershipPlan from "./app/screens/MembershipPlan";
import MembershipCheckout from "./app/screens/MembershipCheckout";
import MembersCheckout from "./app/screens/MembersCheckout";
import ThankYou from "./app/screens/ThankYou";
import Competitions from "./app/screens/Competitions";
import Blogs from "./app/screens/Blogs";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthContext } from "./app/components/contexts";

import AsyncStorage from "@react-native-community/async-storage";
import Orders from "./app/screens/Orders";
import BuyMembership from "./app/screens/BuyMembership";
import BlogsPage from "./app/screens/BlogsPage";
import Account1 from "./app/screens/Account1";
import Schedule from "./app/screens/Schedule";
import TermsConditions from "./app/screens/TermsConditions";
import PrivacyPolicy from "./app/screens/PrivacyPolicy";
import ForgotPassword from "./app/screens/ForgotPassword";
import { setCustomText } from "react-native-global-props";

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const customTextProps = {
    style: {
      fontFamily: Platform.OS === "ios" ? "HelveticaNeue" : "Roboto",
      color: "black",
    },
  };
  setCustomText(customTextProps);
  // const registerForPushNotificationsAsync = async () => {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(
  //       Permissions.NOTIFICATIONS
  //     );
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Permissions.askAsync(
  //         Permissions.NOTIFICATIONS
  //       );
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   return token;
  // };

  const validate = (token) => {
    fetch("https://learnercircle.herokuapp.com/validate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          console.log("Success");
        } else {
          console.log("false");
          authContext.signOut();
          Alert.alert(
            "Alert",
            "You have been signed out.",
            [
              {
                text: "Dismiss",
              },
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser.token);
        const userName = foundUser;
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userName", JSON.stringify(userName));
          console.log("success");
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "LOGIN",
          id: userName,
          token: userToken,
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("userName");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {},
      retrieveData: () => {
        return loginState;
      },
      changeMembership: async (foundUser) => {
        const userToken = String(foundUser.userName.token);
        const userName = foundUser.userName;
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userName", JSON.stringify(userName));
          console.log("success");
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "LOGIN",
          id: userName,
          token: userToken,
        });
      },
    }),
    []
  );

  useEffect(() => {
    // registerForPushNotificationsAsync();

    setTimeout(async () => {
      let userToken;
      let userName;
      userToken = null;
      userName = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        value = await AsyncStorage.getItem("userName");
        userName = JSON.parse(value);
      } catch (e) {
        console.log(e);
      }
      console.log("user token: ", userToken);
      console.log("user name: ", userName);
      if (userName !== null) {
        validate(userToken);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken, id: userName });
    }, 1000);
  }, []);

  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  // const MaterialBottomTabs = createBottomTabNavigator();

  createHomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="MembersCheckout" component={MembersCheckout} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ThankYou"
        component={ThankYou}
      />
    </Stack.Navigator>
  );

  createSearchStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Search"
        component={Search}
      />
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="MembersCheckout" component={MembersCheckout} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ThankYou"
        component={ThankYou}
      />
    </Stack.Navigator>
  );

  createAccountStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account1} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Terms and Conditions" component={TermsConditions} />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen
        options={{ title: "Your Plans" }}
        name="MembershipPlan"
        component={MembershipPlan}
      />
      <Stack.Screen name="BuyMembership" component={BuyMembership} />
      <Stack.Screen name="MembershipCheckout" component={MembershipCheckout} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ThankYou"
        component={ThankYou}
      />
    </Stack.Navigator>
  );

  createBlogStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Blogs" component={Blogs} />
      <Stack.Screen name="Blog Page" component={BlogsPage} />
    </Stack.Navigator>
  );

  createCourseStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="My Courses" component={Orders} />
    </Stack.Navigator>
  );

  const Tab = createMaterialBottomTabNavigator();

  return (
    <AuthContext.Provider
      value={(authContext, { authContext, loginState: loginState })}
    >
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#ff7355"
          inactiveColor="white"
          labelStyle={{ fontSize: 12 }}
          barStyle={{ backgroundColor: "#4835bb" }}
        >
          <Tab.Screen
            name="Home"
            component={createHomeStack}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="My Courses"
            component={createCourseStack}
            options={{
              tabBarLabel: "My Courses",
              tabBarIcon: ({ color }) => (
                <MaterialIcons
                  name="play-circle-outline"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Competitions"
            component={Competitions}
            options={{
              tabBarLabel: "Competitions",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="list" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Blogs"
            component={createBlogStack}
            options={{
              tabBarLabel: "Insights",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="border-color" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="Account"
            component={createAccountStack}
            options={{
              tabBarLabel: "Account",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "black",
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollView: {},
  text: {
    fontSize: 42,
  },
  signIn: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
