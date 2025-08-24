import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  devButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
  },
  testParallelogram: {
    width: 10,
    height: 10,
    backgroundColor: "#ffffff",
    transform: [{ skewX: "-20deg" }],
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  inlineContainer: {
    flexDirection: "row",
  },
  logoBox: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 850,
    height: 850,
    zIndex: -3,
  },
  logoInner: {
    position: "absolute",
    zIndex: -2,
    height: 150,
    width: 150,
  },
});
