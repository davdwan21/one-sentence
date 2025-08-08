import { StyleSheet } from "react-native";

export const indexStyles = StyleSheet.create({
  input: {
    height: 160,
    width: 300,
    borderColor: "#888",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#E0E0E0",
    fontSize: 16,
    padding: 12,
    marginTop: 40,
  },
  button: {
    backgroundColor: "#888",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  fadingContainer: {
    padding: 20,
  },
  keyboardDismissContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 400,
  },
});
