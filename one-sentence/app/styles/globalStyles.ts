import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  title: {
    position: "absolute",
    top: 40,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E0E0E0",
  },
  input: {
    height: 120,
    width: 300,
    borderColor: "#888",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#E0E0E0",
    fontSize: 16,
    padding: 12,
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
  successText: {
    fontSize: 24,
    color: "#E0E0E0",
  },
});
