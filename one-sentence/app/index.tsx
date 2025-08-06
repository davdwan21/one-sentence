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
    }, 1500);
  };

  // get date
  const date = new Date();
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return (
    <SafeAreaView style={[{ backgroundColor: "#222" }, globalStyles.container]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Text style={globalStyles.backgroundMonth}>{month}</Text>
          <Text style={globalStyles.backgroundDayYear}>
            {day} {year}
          </Text>
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
