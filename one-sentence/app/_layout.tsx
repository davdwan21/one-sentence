import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot, usePathname } from "expo-router";
import { globalStyles } from "./styles/globalStyles";
import { Background } from "./components/Background";
import { useEffect, useState } from "react";
import { Loading2Spins } from "./components/LoadingLogo";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {}, [pathname]);

  if (isLoading) {
    return <Loading2Spins />;
  }

  let backgroundText = pathname === "/" ? "title" : "view";

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[{ backgroundColor: "#0B1215" }, globalStyles.container]}
      >
        <Background titleText={backgroundText} />
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
