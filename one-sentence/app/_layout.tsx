import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { globalStyles } from "./styles/globalStyles";
import { useEffect, useState } from "react";
import { Loading1Spin, Loading2Spins } from "./components/LoadingLogo";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const randomNum = Math.random();
  const oneSpin = randomNum < 0.66 ? true : false;
  const loadingTime = randomNum < 0.66 ? 3000 : 4000;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);
  }, []);

  if (isLoading) {
    if (oneSpin) {
      return <Loading1Spin />;
    } else {
      return <Loading2Spins />;
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[{ backgroundColor: "#0B1215" }, globalStyles.container]}
      >
        <View style={globalStyles.slotContainer}>
          <Slot />
        </View>
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
