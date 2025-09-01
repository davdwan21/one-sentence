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
  searchBar: {
    top: 25,
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 5,
    color: "#eee",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 40,
    width: 350,
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
    top: 40,
    flex: 1,
    width: "90%",
  },
  menuInlineContainer: {
    flexDirection: "row",
    paddingLeft: 185,
  },
  menuItemContainer: {
    padding: 3,
    transform: [{ translateY: -7 }],
    paddingLeft: 5,
    paddingRight: 5,
  },
});
