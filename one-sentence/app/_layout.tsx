import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { globalStyles } from "./styles/globalStyles";
import { getSplitDate } from "./utils/getDate";
import { useEffect, useState } from "react";
import { Loading5Sec } from "./components/LoadingLogo";

export default function RootLayout() {
  const { month, day, year } = getSplitDate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return <Loading5Sec />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[{ backgroundColor: "#0B1215" }, globalStyles.container]}
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

/* loading screen dots
        <View style={globalStyles.inlineContainer}>
          <View style={globalStyles.testParallelogram} />
          <View style={globalStyles.testParallelogram} />
          <View style={globalStyles.testParallelogram} />
        </View>
        */
