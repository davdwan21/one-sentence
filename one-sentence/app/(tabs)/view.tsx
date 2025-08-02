import { Text, View, StyleSheet } from "react-native";

// categorize sentences by date

export default function ViewSentences() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>view past sentences page</Text>
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
  },
});
