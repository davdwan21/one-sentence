import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  useAnimatedValue,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Easing,
} from "react-native";
import { useState } from "react";
import { getCombinedDate } from "./utils/getDate";
import { useRouter } from "expo-router";
import { indexStyles } from "./styles/indexStyles";

// might need to implement a character count
// check that the text box isnt empty before submission
// kinda want the keyboard to push up the other stuff so you can still see the button comfortably

export default function Index() {
  const router = useRouter();
  const fadeAnim = useAnimatedValue(1);
  const [inputValue, setInputValue] = useState("");
  const date = getCombinedDate();

  const handleSubmit = () => {
    console.log("Submitted value: " + inputValue);
    Keyboard.dismiss();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.bezier(0.83, 0.67, 0.17, 0.67),
      useNativeDriver: true,
    }).start(() => {
      handleNavigation();
    });
  };

  const handleNavigation = () => {
    setTimeout(() => {
      router.push({
        pathname: "/view",
        params: {
          content: inputValue,
          date: date,
        },
      });
      console.log("Navigation successful");
    }, 500);
  };

  const devGoToView = () => {
    router.push({
      pathname: "/view",
    });
  };

  return (
    <TouchableWithoutFeedback
      style={indexStyles.keyboardDismissContainer}
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[indexStyles.keyboardDismissContainer, { opacity: fadeAnim }]}
        >
          <TextInput
            style={indexStyles.input}
            multiline={true}
            placeholder={
              "what's on your mind?\n\n...\n\n\nan idea? a feeling? a goal?"
            }
            placeholderTextColor={"#666"}
            value={inputValue}
            onChangeText={setInputValue}
            numberOfLines={4}
          />
          <TouchableOpacity style={indexStyles.button} onPress={handleSubmit}>
            <Text>submit log</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
