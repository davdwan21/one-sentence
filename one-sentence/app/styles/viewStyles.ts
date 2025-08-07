import { StyleSheet } from "react-native";

export const viewStyles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#888",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    transform: [{ translateY: 120 }],
    borderWidth: 1,
    borderColor: "blue",
  },
  testContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "purple",
    width: 400,
  },
});
