import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

// text box to type a sentence
// title at the top
// when you hit enter in the text box it appears in the view page with the date

export default function Index() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>home page</Text>
      <TextInput
        style={styles.input}
        placeholder="what's on your mind?"
        placeholderTextColor={"#666"}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 15,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#888",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#fff",
  },
});
