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
import { getCombinedDate } from "./utils/getDate";
import { useRouter } from "expo-router";
import { indexStyles } from "./styles/indexStyles";
import { globalStyles } from "./styles/globalStyles";

// might need to implement a character count
// check that the text box isnt empty before submission
// kinda want the keyboard to push up the other stuff so you can still see the button comfortably

export default function Index() {
  const router = useRouter();
  const fadeAnim = useAnimatedValue(1);
  const [inputValue, setInputValue] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const date = getCombinedDate();

  const handleSubmit = () => {
    console.log("Submitted value: " + inputValue);
    Keyboard.dismiss();
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
        pathname: "/view",
        params: {
          userInput: inputValue,
          date: date,
        },
      });
      console.log("Navigation successful");
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback
      style={indexStyles.keyboardDismissContainer}
      onPress={Keyboard.dismiss}
    >
      {!showSuccess ? (
        <Animated.View
          style={[indexStyles.keyboardDismissContainer, { opacity: fadeAnim }]}
        >
          <Text style={globalStyles.title}>home page</Text>
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
      ) : (
        <View style={globalStyles.container}>
          <Text style={globalStyles.successText}>success :)</Text>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
}
