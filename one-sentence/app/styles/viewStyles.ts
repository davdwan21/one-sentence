import { LogBox, StyleSheet } from "react-native";

export const viewStyles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "transparent",
    padding: 20,
    transform: [{ translateY: 100 }],
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "purple",
    width: 400,
  },
  logDate: {
    fontSize: 14,
    marginBottom: 8,
    color: "#aaa",
  },
  logContent: {
    fontSize: 16,
    color: "#eee",
  },
});
