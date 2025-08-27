import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { globalStyles } from "./styles/globalStyles";
import { Background } from "./components/Background";
import { useEffect, useState } from "react";
import { Loading2Spins } from "./components/LoadingLogo";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  if (isLoading) {
    return <Loading2Spins />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[{ backgroundColor: "#0B1215" }, globalStyles.container]}
      >
        <Background />
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
