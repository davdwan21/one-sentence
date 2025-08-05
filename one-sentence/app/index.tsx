import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  useAnimatedValue,
  Animated,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { globalStyles } from "./styles/globalStyles";

// might need to implement a character count
// check that the text box isnt empty before submission
// kinda want the keyboard to push up the other stuff so you can still see the button comfortably

export default function Index() {
  const router = useRouter();
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
      handleNavigation();
    });
  };

  const handleNavigation = () => {
    setTimeout(() => {
      router.push({
        pathname: "/success",
        params: { userInput: inputValue },
      });
      console.log("navigation successful");
    }, 2000);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container}>
          {!showSuccess ? (
            <Animated.View
              style={[globalStyles.container, { opacity: fadeAnim }]}
            >
              <Text style={globalStyles.title}>home page</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="what's on your mind?"
                placeholderTextColor={"#666"}
                value={inputValue}
                onChangeText={setInputValue}
                multiline={true}
                numberOfLines={4}
              />
              <TouchableOpacity
                style={globalStyles.button}
                onPress={handleSubmit}
              >
                <Text>submit log</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Text style={globalStyles.successText}>success :)</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
