import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  title: {
    position: "absolute",
    top: 40,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E0E0E0",
  },
  backgroundMonth: {
    position: "absolute",
    top: "5%",
    left: "0%",
    fontSize: 180,
    color: "#666",
    fontWeight: "bold",
    opacity: 0.15,
    zIndex: -1,
  },
  backgroundDayYear: {
    position: "absolute",
    top: "26%",
    left: "0%",
    fontSize: 90,
    color: "#666",
    fontWeight: "bold",
    opacity: 0.15,
    zIndex: -1,
  },
  successText: {
    fontSize: 24,
    color: "#E0E0E0",
  },
});
