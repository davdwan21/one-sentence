import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { globalStyles } from "./styles/globalStyles";
import { getSplitDate } from "./utils/getDate";

/*
Using Slot instead of Stack because the user
shouldn't be able to go back to the input page
*/

export default function RootLayout() {
  const { month, day, year } = getSplitDate();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[{ backgroundColor: "#222" }, globalStyles.container]}
      >
        <Text style={globalStyles.backgroundMonth}>{month}</Text>
        <Text style={globalStyles.backgroundDayYear}>
          {day} {year}
        </Text>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
