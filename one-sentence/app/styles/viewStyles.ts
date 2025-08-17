import { StyleSheet } from "react-native";

export const viewStyles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "transparent",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  listContainer: {
    marginTop: 100,
    flex: 1,
    width: "90%",
  },
  inlineContainer: {
    flexDirection: "row",
  },
  deleteContainer: {
    marginLeft: 225,
    padding: 3,
    transform: [{ translateY: -7 }],
  },
});
