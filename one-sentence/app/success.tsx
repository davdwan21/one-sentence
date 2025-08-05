import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "./styles/globalStyles";

export default function SuccessScreen() {
  const { userInput } = useLocalSearchParams();

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.successText}>input received:</Text>
      <Text style={globalStyles.successText}>{userInput}</Text>
    </SafeAreaView>
  );
}
