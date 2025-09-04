import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    top: 40,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E0E0E0",
  },
  slotContainer: {
    zIndex: 1,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  backgroundTitle: {
    top: 40,
    fontSize: 120,
    color: "#666",
    fontWeight: "bold",
    opacity: 0.15,
    zIndex: -1,
  },
  backgroundMonth: {
    top: 50,
    fontSize: 180,
    color: "#666",
    fontWeight: "bold",
    opacity: 0.15,
    zIndex: -1,
  },
  backgroundDayYear: {
    fontSize: 95,
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
