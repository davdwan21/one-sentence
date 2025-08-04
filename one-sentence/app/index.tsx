import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  useAnimatedValue,
  Animated,
} from "react-native";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// might need to implement a character count
// check that the text box isnt empty before submission
// kinda want the keyboard to push up the other stuff so you can still see the button comfortably

export default function Index() {
  const fadeAnim = useAnimatedValue(1);
  const [inputValue, setInputValue] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    console.log("submitted value " + inputValue);
    Keyboard.dismiss();
    fadeOut();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setShowSuccess(true);
      // navigate to view sentences page
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {!showSuccess ? (
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
              <Text style={styles.title}>home page</Text>
              <TextInput
                style={styles.input}
                placeholder="what's on your mind?"
                placeholderTextColor={"#666"}
                value={inputValue}
                onChangeText={setInputValue}
                multiline={true}
                numberOfLines={4}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text>submit log</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Text>success :)</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
