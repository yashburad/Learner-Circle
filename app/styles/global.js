import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: { color: "black", flex: 1, backgroundColor: "white" },
  forminput: {
    height: 50,
    borderColor: "#eeeeee",
    borderWidth: 1,
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
  forminputtitle: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
  },
  texterror: {
    color: "crimson",
    marginBottom: 10,
    marginTop: 6,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#8300e9",
    paddingVertical: 15,
    borderRadius: 10,
  },
});
